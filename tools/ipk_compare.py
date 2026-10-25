#!/usr/bin/env python3

"""
Usage:

Before the process:
python3 ipk_compare.py snapshot before.json

After the process:
python3 ipk_compare.py snapshot after.json
python3 ipk_compare.py compare before.json after.json
"""

import json
import sys
from pathlib import Path
from collections import defaultdict

folder = "/home/ubuntu/6.9/builds/openvix/developer/gb7252/tmp/deploy/ipk"

ROOT = Path(folder)


def snapshot(filename):
    packages = {}

    for path in ROOT.rglob("*.ipk"):
        parts = path.stem.rsplit("_", 2)

        if len(parts) != 3:
            print(f"Warning: cannot parse filename: {path.name}")
            continue

        name, version, arch = parts
        relative_path = str(path.relative_to(ROOT))

        packages[relative_path] = {
            "name": name,
            "version": version,
            "arch": arch,
        }

    Path(filename).write_text(
        json.dumps(packages, indent=2),
        encoding="utf-8",
    )

    print(f"Saved {len(packages)} IPK files to {filename}")


def compare(before_file, after_file):
    before = json.loads(Path(before_file).read_text(encoding="utf-8"))
    after = json.loads(Path(after_file).read_text(encoding="utf-8"))

    old_paths = set(before)
    new_paths = set(after)

    print("\n=== NEW IPK FILES ===")
    for path in sorted(new_paths - old_paths):
        p = after[path]
        print(f"{p['name']} {p['version']} [{p['arch']}]  {path}")

    print("\n=== REMOVED IPK FILES ===")
    for path in sorted(old_paths - new_paths):
        p = before[path]
        print(f"{p['name']} {p['version']} [{p['arch']}]  {path}")

    old_packages = defaultdict(set)
    new_packages = defaultdict(set)

    for p in before.values():
        old_packages[(p["name"], p["arch"])].add(p["version"])

    for p in after.values():
        new_packages[(p["name"], p["arch"])].add(p["version"])

    print("\n=== PACKAGE VERSION CHANGES ===")
    found = False

    for key in sorted(old_packages.keys() & new_packages.keys()):
        old_versions = old_packages[key]
        new_versions = new_packages[key]

        if old_versions != new_versions:
            removed = old_versions - new_versions
            added = new_versions - old_versions

            if removed and added:
                print(
                    f"{key[0]} [{key[1]}]: "
                    f"{', '.join(sorted(removed))} -> "
                    f"{', '.join(sorted(added))}"
                )
                found = True

    if not found:
        print("No version changes detected.")


if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "snapshot":
        snapshot(sys.argv[2])
    elif len(sys.argv) == 4 and sys.argv[1] == "compare":
        compare(sys.argv[2], sys.argv[3])
    else:
        sys.exit(
            f"Usage:\n"
            f"  {sys.argv[0]} snapshot before.json\n"
            f"  {sys.argv[0]} snapshot after.json\n"
            f"  {sys.argv[0]} compare before.json after.json"
        )
