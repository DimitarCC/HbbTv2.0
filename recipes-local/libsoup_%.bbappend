RDEPENDS:${PN}:append = "${@bb.utils.contains_any('DISTRO', 'openvix', ' brotli nghttp2', '', d)}"
