#!/usr/bin/env python3
# Collect the HbbTV 2.0 packages from a build's deploy folder and copy them into the static feed folders.
# Run with --dry-run first. Without options it copies, and never deletes anything.

import argparse
import hashlib
import re
import shutil
import subprocess
import sys
from pathlib import Path

ARCH = "cortexa15hf-neon-vfpv4"

# deploy sub-folder -> (feed folder, package names)
PACKAGES = {
	ARCH: ("static-" + ARCH, [
		"enigma2-plugin-extensions-wpehbbtv",
		"orb",
		"libwpewebkit-2.0-1",
		"libwpewebkit-2.0-web-inspector-plugin",
		"libepoxy0",
		"libsoup",
		"libnghttp2-14",
		"brotli",
		"woff2",
	]),
	"all": ("static-all", [
		"ttf-dejavu-common",
		"ttf-dejavu-sans",
		"ttf-dejavu-sans-mono",
		"ttf-dejavu-serif",
	]),
}


def sha256(path):
	digest = hashlib.sha256()
	try:
		with open(path, "rb") as f:
			for block in iter(lambda: f.read(1 << 20), b""):
				digest.update(block)
	except OSError:
		return None
	return digest.hexdigest()


def find(folder, name, arch):
	"""All deploy files of one package, newest first."""
	pattern = re.compile(r"^%s_.+_%s\.ipk$" % (re.escape(name), re.escape(arch)))
	try:
		files = [p for p in folder.iterdir() if pattern.match(p.name)]
	except OSError:
		return []
	return sorted(files, key=lambda p: p.stat().st_mtime, reverse=True)


def main():
	parser = argparse.ArgumentParser(description=__doc__)
	parser.add_argument("--src", default="/home/ubuntu/6.9/builds/openvix/developer/gb7252/tmp/deploy/ipk", help="the build's deploy/ipk folder")
	parser.add_argument("--dest", default="/home/ubuntu/www/feed-static-6.0", help="folder that holds the static-* feed folders")
	parser.add_argument("--dry-run", action="store_true", help="only show what would be done")
	parser.add_argument("--prune", action="store_true", help="delete older versions of the same package from the feed folder")
	parser.add_argument("--index", action="store_true", help="rebuild Packages and Packages.gz of the changed folders with the indexer script")
	parser.add_argument("--indexer", default="~/recreate_feed.py", help="the indexer script, called as: python3 SCRIPT FOLDER")
	args = parser.parse_args()

	src, dest = Path(args.src), Path(args.dest)
	if not src.is_dir():
		print("Deploy folder not found: %s" % src)
		return 1

	missing = []
	changed = set()
	for arch, (feed, names) in PACKAGES.items():
		target = dest / feed
		if not target.is_dir() and not args.dry_run:
			try:
				target.mkdir(parents=True, exist_ok=True)
			except OSError as e:
				print("Cannot create %s: %s" % (target, e))
				return 1
		for name in names:
			files = find(src / arch, name, arch)
			if not files:
				missing.append("%s/%s" % (arch, name))
				print("MISSING  %s (%s)" % (name, arch))
				continue
			best = files[0]
			if len(files) > 1:
				print("note     %s: %d versions in the deploy folder, using the newest (%s)" % (name, len(files), best.name))
			out = target / best.name
			if out.exists() and sha256(out) == sha256(best):
				print("same     %s -> %s" % (best.name, feed))
			else:
				print("copy     %s -> %s" % (best.name, feed))
				if not args.dry_run:
					try:
						shutil.copy2(best, out)
						changed.add(target)
					except OSError as e:
						print("ERROR    %s: %s" % (best.name, e))
						missing.append("%s/%s" % (arch, name))
						continue
			if args.prune:
				for old in find(target, name, arch):
					if old.name != best.name:
						print("remove   %s from %s" % (old.name, feed))
						if not args.dry_run:
							try:
								old.unlink()
								changed.add(target)
							except OSError as e:
								print("ERROR    %s: %s" % (old.name, e))

	if args.index and not args.dry_run:
		indexer = Path(args.indexer).expanduser()
		if not indexer.is_file():
			print("Indexer not found: %s. The indexes were NOT rebuilt." % indexer)
			missing.append("indexer")
		else:
			for target in sorted(changed):
				print("index    %s" % target)
				if subprocess.run([sys.executable, str(indexer), str(target)]).returncode != 0:
					print("ERROR    %s failed in %s" % (indexer.name, target))
					missing.append("index " + target.name)
	elif changed and not args.index:
		print("The indexes (Packages, Packages.gz) of these folders still need rebuilding: %s" % ", ".join(sorted(str(t) for t in changed)))

	if missing:
		print("\n%d package(s) not copied: %s" % (len(missing), ", ".join(missing)))
		return 1
	return 0


if __name__ == "__main__":
	sys.exit(main())
