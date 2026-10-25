SUMMARY = "HbbTV 2.0 plugin and everything it needs"
inherit packagegroup
RDEPENDS:${PN} = "enigma2-plugin-extensions-wpehbbtv"
do_build[recrdeptask] += "do_package_write_ipk"