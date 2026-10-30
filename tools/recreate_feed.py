#!/usr/bin/env python3

import os
import sys
import argparse
import gzip
import tarfile
import hashlib
import shutil
import io
import re
import fcntl
import concurrent.futures


def error(message):
    print(f"ERROR: {message}", file=sys.stderr)


def warning(message):
    print(f"WARNING: {message}", file=sys.stderr)


def read_ar_member(path, wanted_names):
    """
    Read a member directly from a standard ar archive.

    wanted_names is a tuple of acceptable member names.

    Returns the member contents as bytes, or None on error/not found.
    """
    try:
        with open(path, "rb") as f:
            magic = f.read(8)

            if magic != b"!<arch>\n":
                error(f"{path}: not a valid ar archive")
                return None

            while True:
                header = f.read(60)

                if not header:
                    break

                if len(header) != 60:
                    error(f"{path}: truncated ar header")
                    return None

                name = header[0:16].decode(
                    "ascii",
                    errors="replace"
                ).strip()

                size_text = header[48:58].decode(
                    "ascii",
                    errors="replace"
                ).strip()

                try:
                    size = int(size_text)
                except ValueError:
                    error(f"{path}: invalid ar member size")
                    return None

                name = name.rstrip("/")

                data = f.read(size)

                if len(data) != size:
                    error(
                        f"{path}: truncated ar member {name}"
                    )
                    return None

                if name in wanted_names:
                    return data

                # ar members are aligned to even byte boundaries.
                if size & 1:
                    f.seek(1, os.SEEK_CUR)

    except OSError as e:
        error(f"{path}: {e}")
        return None

    return None


def read_control(ipk):
    """
    Read control from control.tar.* inside an IPK (gz, xz, bz2, plain;
    zst needs Python 3.14 or newer).

    Supports both:
        ./control
        control
    """
    control_tar = read_ar_member(
        ipk,
        (
            "control.tar.gz",
            "control.tar.xz",
            "control.tar.bz2",
            "control.tar.zst",
            "control.tar"
        )
    )

    if control_tar is None:
        error(
            f"{ipk}: control.tar.* not found"
        )
        return None

    try:
        with tarfile.open(
            fileobj=io.BytesIO(control_tar),
            mode="r:*"
        ) as tar:

            member = None

            try:
                member = tar.getmember("./control")
            except KeyError:
                try:
                    member = tar.getmember("control")
                except KeyError:
                    pass

            if member is None:
                error(
                    f"{ipk}: control file not found "
                    f"in control.tar.*"
                )
                return None

            extracted = tar.extractfile(member)

            if extracted is None:
                error(
                    f"{ipk}: unable to extract control"
                )
                return None

            return extracted.read().decode(
                "utf-8",
                errors="replace"
            )

    except (tarfile.TarError, OSError) as e:
        error(
            f"{ipk}: invalid control.tar.*: {e}"
        )
        return None


def get_field(control, field):
    """
    Return the first value of a control field.
    """
    prefix = field + ":"

    for line in control.splitlines():
        if line.startswith(prefix):
            return line[len(prefix):].strip()

    return ""


def calculate_md5_and_sha256(path):
    md5 = hashlib.md5()
    sha256 = hashlib.sha256()

    try:
        with open(path, "rb") as f:
            while True:
                data = f.read(1024 * 1024)

                if not data:
                    break

                md5.update(data)
                sha256.update(data)

    except OSError as e:
        error(f"{path}: {e}")
        return None, None

    return md5.hexdigest(), sha256.hexdigest()


def debian_version_compare(a, b):
    """
    Compare two Debian package versions.

    Returns:
        -1 if a < b
         0 if a == b
         1 if a > b
    """

    def split_version(version):
        # Epoch
        if ":" in version:
            epoch, version = version.split(":", 1)

            try:
                epoch = int(epoch)
            except ValueError:
                epoch = 0
        else:
            epoch = 0

        # Debian revision
        if "-" in version:
            upstream, revision = version.rsplit("-", 1)
        else:
            upstream = version
            revision = ""

        return epoch, upstream, revision

    def is_ascii_digit(c):
        return "0" <= c <= "9"

    def order_char(c):
        """
        Debian ordering for non-digit characters.
        """
        if c == "~":
            return -1

        if c == "" or is_ascii_digit(c):
            return 0

        if "A" <= c <= "Z" or "a" <= c <= "z":
            return ord(c)

        return ord(c) + 256

    def compare_part(a, b):
        i = 0
        j = 0

        while i < len(a) or j < len(b):

            # Compare non-digit portions.
            while (
                (
                    i < len(a)
                    and not is_ascii_digit(a[i])
                )
                or
                (
                    j < len(b)
                    and not is_ascii_digit(b[j])
                )
            ):
                ca = a[i] if i < len(a) else ""
                cb = b[j] if j < len(b) else ""

                oa = order_char(ca)
                ob = order_char(cb)

                if oa != ob:
                    return -1 if oa < ob else 1

                if i < len(a):
                    i += 1

                if j < len(b):
                    j += 1

            # Compare digit portions numerically.
            ia = i
            ib = j

            while (
                ia < len(a)
                and is_ascii_digit(a[ia])
            ):
                ia += 1

            while (
                ib < len(b)
                and is_ascii_digit(b[ib])
            ):
                ib += 1

            da = a[i:ia].lstrip("0") or "0"
            db = b[j:ib].lstrip("0") or "0"

            if len(da) != len(db):
                return (
                    -1
                    if len(da) < len(db)
                    else 1
                )

            if da != db:
                return -1 if da < db else 1

            i = ia
            j = ib

        return 0

    epoch_a, upstream_a, revision_a = split_version(a)
    epoch_b, upstream_b, revision_b = split_version(b)

    # Epoch.
    if epoch_a != epoch_b:
        return (
            -1
            if epoch_a < epoch_b
            else 1
        )

    # Upstream version.
    result = compare_part(
        upstream_a,
        upstream_b
    )

    if result:
        return result

    # Debian revision.
    return compare_part(
        revision_a,
        revision_b
    )


def debian_version_greater(new_version, old_version):
    return (
        debian_version_compare(
            new_version,
            old_version
        ) > 0
    )


def normalize_depends(line):
    """
    Reproduce the original sed transformations:

        (>X  -> (>=X
        (<X  -> (<=X

    Equivalent to:

        sed -e "/^Depends:/s/(>\\([^>=]\\)/(>=\\1/g" \
            -e "/^Depends:/s/(<\\([^<=]\\)/(<=\\1/g"
    """

    if not line.startswith("Depends:"):
        return line

    # The original sed requires a character immediately after
    # the > or < which is neither > nor =.
    #
    # Capture that character and replace:
    #
    #   (>X  -> (>=X
    #   (<X  -> (<=X
    #
    # Whitespace, if present, is therefore preserved as the
    # captured character.

    value = line[len("Depends:"):]

    value = re.sub(
        r"\(>([^>=])",
        r"(>=\1",
        value
    )

    value = re.sub(
        r"\(<([^<=])",
        r"(<=\1",
        value
    )

    return "Depends:" + value


FIELD_ORDER = [
    "Package", "Version", "Depends", "Provides", "Replaces", "Conflicts",
    "Suggests", "Recommends", "Section", "Architecture", "Maintainer",
    "MD5Sum", "SHA256sum", "Size", "Filename", "Source", "Description",
    "OE", "HomePage", "License", "Priority",
]


def parse_control_fields(control):
    """
    Parse control text into an ordered list of
    (field_name, block_text) tuples.

    block_text includes the field's own line and any
    continuation lines (lines starting with whitespace),
    joined with newlines, exactly as they appeared.
    """
    fields = []
    current_name = None
    current_lines = []

    for line in control.splitlines():

        if not line.strip():
            continue

        if line[0] in (" ", "\t"):
            # Continuation line - belongs to the current field.
            if current_name is not None:
                current_lines.append(line)
            continue

        if ":" in line:
            # New field - flush the previous one first.
            if current_name is not None:
                fields.append(
                    (current_name, "\n".join(current_lines))
                )

            current_name, _, _ = line.partition(":")
            current_name = current_name.strip()
            current_lines = [line]
        else:
            # Malformed line with no field name - attach it
            # to whatever field is currently open, if any.
            if current_name is not None:
                current_lines.append(line)

    if current_name is not None:
        fields.append(
            (current_name, "\n".join(current_lines))
        )

    return fields


def order_fields(fields):
    """
    Reorder (field_name, block_text) tuples according to
    FIELD_ORDER. Fields not listed keep their original
    relative order, placed after all known fields.
    """
    order_lookup = {
        name.lower(): index
        for index, name in enumerate(FIELD_ORDER)
    }

    def sort_key(item):
        name = item[0]
        index = order_lookup.get(name.lower())
        if index is not None:
            return (0, index)
        return (1, 0)

    return sorted(fields, key=sort_key)


def parse_packages(packages_file):
    """
    Read existing Packages metadata.

    Existing MD5 values are informational only.
    Actual IPKs are always hashed again.
    """
    entries = {}

    if not os.path.isfile(packages_file):
        return entries

    try:
        with open(
            packages_file,
            "r",
            encoding="utf-8",
            errors="replace"
        ) as f:
            content = f.read()

    except OSError as e:
        error(f"{packages_file}: {e}")
        return entries

    for block in content.split("\n\n"):

        if not block.strip():
            continue

        entry = {}

        for line in block.splitlines():

            if line.startswith("Package:"):
                entry["package"] = (
                    line[len("Package:"):].strip()
                )

            elif line.startswith("Version:"):
                entry["version"] = (
                    line[len("Version:"):].strip()
                )

            elif line.startswith("Filename:"):
                entry["filename"] = (
                    line[len("Filename:"):].strip()
                )

            elif line.startswith("Size:"):
                entry["size"] = (
                    line[len("Size:"):].strip()
                )

            elif line.startswith("MD5Sum:"):
                entry["md5"] = (
                    line[len("MD5Sum:"):].strip()
                )

        filename = entry.get("filename")

        if filename:
            entries[filename] = entry

    return entries


def write_atomic(path, data):
    """
    Write bytes to a temporary file and atomically replace path.
    """
    directory = os.path.dirname(path) or "."
    basename = os.path.basename(path)

    temp_path = os.path.join(
        directory,
        f".{basename}.tmp.{os.getpid()}"
    )

    try:
        with open(temp_path, "wb") as f:
            f.write(data)
            f.flush()
            os.fsync(f.fileno())

        os.replace(temp_path, path)

        return True

    except OSError as e:
        error(f"unable to write {path}: {e}")

        try:
            os.unlink(temp_path)
        except OSError:
            pass

        return False


def acquire_lock(lock_path):
    """
    Lock lock_path without waiting.

    Returns the open lock file, or None (message printed).

    The instance that holds the lock deletes the file when it
    finishes, so after locking, check that the file at lock_path
    is still the one that was locked.
    """
    for _ in range(5):
        try:
            lock_file = open(lock_path, "w")
        except OSError as e:
            error(f"unable to create lock file: {e}")
            return None

        try:
            fcntl.flock(
                lock_file.fileno(),
                fcntl.LOCK_EX | fcntl.LOCK_NB
            )
        except BlockingIOError:
            error("another instance is already running")
            lock_file.close()
            return None

        try:
            if (
                os.fstat(lock_file.fileno()).st_ino
                == os.stat(lock_path).st_ino
            ):
                return lock_file
        except OSError:
            pass

        lock_file.close()

    error("unable to lock the feed")
    return None


def main():

    parser = argparse.ArgumentParser(
        description=(
            "Recreate Packages and Packages.gz of an ipk "
            "feed folder. Older versions of a package are "
            "deleted."
        )
    )

    parser.add_argument(
        "package_directory"
    )

    parser.add_argument(
        "--keep-old",
        action="store_true",
        help=(
            "move older versions to old/ inside the "
            "folder instead of deleting them"
        )
    )

    args = parser.parse_args()

    pkg_dir = args.package_directory

    if not os.path.isdir(pkg_dir):
        error(f"not a directory: {pkg_dir}")
        return 1

    packages_file = os.path.join(
        pkg_dir,
        "Packages"
    )

    packages_gz = os.path.join(
        pkg_dir,
        "Packages.gz"
    )

    old_dir = os.path.join(
        pkg_dir,
        "old"
    )

    lock_path = os.path.join(
        pkg_dir,
        ".recreate_feed.lock"
    )

    # ---------------------------------------------------------
    # Concurrency guard
    # ---------------------------------------------------------

    lock_file = acquire_lock(lock_path)

    if lock_file is None:
        return 1

    try:

        # -----------------------------------------------------
        # Read existing Packages
        # -----------------------------------------------------

        old_entries = parse_packages(
            packages_file
        )

        # -----------------------------------------------------
        # Find IPKs
        # -----------------------------------------------------

        try:
            ipks = [
                os.path.join(
                    pkg_dir,
                    filename
                )
                for filename in os.listdir(pkg_dir)
                if (
                    filename.endswith(".ipk")
                    and os.path.isfile(
                        os.path.join(
                            pkg_dir,
                            filename
                        )
                    )
                )
            ]

        except OSError as e:
            error(f"{pkg_dir}: {e}")
            return 1

        ipks.sort()

        current_filenames = {
            os.path.basename(ipk)
            for ipk in ipks
        }

        for filename in old_entries:
            if filename not in current_filenames:
                print(
                    f"Removed package: {filename}",
                    file=sys.stderr
                )

        # -----------------------------------------------------
        # First pass - expensive I/O, done in parallel
        # -----------------------------------------------------

        def process_ipk(ipk):
            filename = os.path.basename(ipk)
            package_name = filename.split("_", 1)[0]

            control = read_control(ipk)

            if control is None:
                return ipk, None

            version = get_field(control, "Version")

            if not version:
                error(f"{ipk}: Version field missing")
                return ipk, None

            md5, sha256 = calculate_md5_and_sha256(ipk)

            if md5 is None or sha256 is None:
                return ipk, None
        
            try:
                size = os.path.getsize(ipk)
            except OSError as e:
                error(f"{ipk}: {e}")
                return ipk, None

            return ipk, {
                "filename": filename,
                "package": package_name,
                "version": version,
                "control": control,
                "md5": md5,
                "sha256": sha256,
                "size": size,
            }

        results = {}

        with concurrent.futures.ThreadPoolExecutor() as executor:
            for ipk, data in executor.map(process_ipk, ipks):
                results[ipk] = data

        # -----------------------------------------------------
        # Second pass - sequential, order-dependent logic
        # -----------------------------------------------------

        best_version = {}
        best_package = {}
        package_data = {}

        duplicate_versions = {}

        for ipk in ipks:

            data = results[ipk]

            if data is None:
                continue

            filename = data["filename"]
            package_name = data["package"]
            version = data["version"]
            md5 = data["md5"]
            size = data["size"]

            print(
                f"Checking version for package "
                f"{package_name}",
                file=sys.stderr
            )

            old = old_entries.get(filename)

            if old is not None:
                if old.get("md5") != md5:
                    print(
                        f"Modified package: {filename}",
                        file=sys.stderr
                    )
                elif old.get("size") != str(size):
                    print(
                        f"Size changed: {filename}",
                        file=sys.stderr
                    )

                if old.get("version") != version:
                    print(
                        f"Version changed: {filename}: "
                        f"{old.get('version')} -> {version}",
                        file=sys.stderr,
                    )

            package_data[ipk] = data

            # -------------------------------------------------
            # Version selection
            # -------------------------------------------------

            if package_name not in best_version:

                best_version[package_name] = version
                best_package[package_name] = ipk

            else:

                comparison = debian_version_compare(
                    version,
                    best_version[package_name]
                )

                if comparison == 0:

                    duplicate_versions.setdefault(
                        package_name,
                        []
                    ).append(ipk)

                elif comparison > 0:

                    best_version[package_name] = version
                    best_package[package_name] = ipk

        # -----------------------------------------------------
        # Report duplicate versions
        # -----------------------------------------------------

        if duplicate_versions:

            for package_name, duplicates in (
                duplicate_versions.items()
            ):

                first_ipk = best_package.get(
                    package_name
                )

                warning(
                    f"duplicate version for package "
                    f"{package_name}:"
                )

                if first_ipk:
                    print(
                        f"    {first_ipk}",
                        file=sys.stderr
                    )

                for ipk in duplicates:
                    print(
                        f"    {ipk}",
                        file=sys.stderr
                    )

            error(
                "duplicate package versions found; "
                "feed was not changed"
            )

            return 1

        # -----------------------------------------------------
        # Build Packages entirely in memory
        # -----------------------------------------------------

        package_blocks = []
        old_packages = []

        for ipk in sorted(package_data):

            data = package_data[ipk]

            package_name = data["package"]

            # ---------------------------------------------
            # Older version
            # ---------------------------------------------

            if (
                best_package.get(package_name)
                != ipk
            ):

                old_packages.append(data)

                continue

            print(
                f"Generating index for package "
                f"{package_name}",
                file=sys.stderr
            )

            control = data["control"]

            fields = parse_control_fields(control)

            # Drop the fields we regenerate ourselves.
            fields = [
                (name, block)
                for name, block in fields
                if name not in ("Filename", "MD5Sum", "SHA256sum", "Size")
            ]

            fields.append(
                ("Filename", f"Filename: {data['filename']}")
            )
            fields.append(
                ("Size", f"Size: {data['size']}")
            )
            fields.append(
                ("MD5Sum", f"MD5Sum: {data['md5']}")
            )
            fields.append(
                ("SHA256sum", f"SHA256sum: {data['sha256']}")
            )

            fields = order_fields(fields)

            output_lines = []

            for name, block in fields:

                if name == "Depends":
                    block = normalize_depends(block)

                output_lines.append(block)

            package_blocks.append(
                "\n".join(output_lines)
            )

        packages_data = ""

        if package_blocks:
            packages_data = (
                "\n\n".join(package_blocks)
                + "\n"
            )

        packages_bytes = packages_data.encode(
            "utf-8"
        )

        # -----------------------------------------------------
        # Build Packages.gz in memory from completed Packages
        # -----------------------------------------------------

        try:
            packages_gz_buffer = io.BytesIO()

            with gzip.GzipFile(
                fileobj=packages_gz_buffer,
                mode="wb"
            ) as gz:

                gz.write(packages_bytes)

            packages_gz_bytes = (
                packages_gz_buffer.getvalue()
            )

        except OSError as e:
            error(
                f"unable to create Packages.gz: {e}"
            )
            return 1

        # -----------------------------------------------------
        # Write both files atomically
        #
        # Nothing has been moved to old/ yet.
        # -----------------------------------------------------

        if not write_atomic(
            packages_file,
            packages_bytes
        ):
            return 1

        if not write_atomic(
            packages_gz,
            packages_gz_bytes
        ):
            return 1

        # -----------------------------------------------------
        # Only now move obsolete packages.
        # -----------------------------------------------------

        if old_packages and not args.keep_old:

            for data in old_packages:

                path = os.path.join(
                    pkg_dir,
                    data["filename"]
                )

                print(
                    f"Removing old package: "
                    f"{data['filename']}",
                    file=sys.stderr
                )

                try:
                    os.unlink(path)

                except OSError as e:
                    error(
                        f"unable to remove {path}: {e}"
                    )

        elif old_packages:

            try:
                os.makedirs(
                    old_dir,
                    exist_ok=True
                )
            except OSError as e:
                error(
                    f"unable to create old/: {e}"
                )
                return 1

            for data in old_packages:

                source = os.path.join(
                    pkg_dir,
                    data["filename"]
                )

                destination = os.path.join(
                    old_dir,
                    data["filename"]
                )

                print(
                    f"Moving old package: "
                    f"{data['filename']}",
                    file=sys.stderr
                )

                try:
                    shutil.move(
                        source,
                        destination
                    )

                except OSError as e:
                    error(
                        f"unable to move {source} "
                        f"to old/: {e}"
                    )

        # -----------------------------------------------------
        # Finished
        # -----------------------------------------------------

        print(
            f"Generated {packages_file}",
            file=sys.stderr
        )

        print(
            f"Generated {packages_gz}",
            file=sys.stderr
        )

        return 0

    finally:

        # Delete the lock file while still holding the lock.
        try:
            os.unlink(lock_path)
        except OSError:
            pass

        try:
            fcntl.flock(
                lock_file.fileno(),
                fcntl.LOCK_UN
            )
        except OSError:
            pass

        lock_file.close()


if __name__ == "__main__":
    sys.exit(main())