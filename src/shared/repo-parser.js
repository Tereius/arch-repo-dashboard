class RepoParser {
  static parse(descr) {
    const lines = descr.split('\n');
    let mode = '';
    let ret = {};
    for (var i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('%') && line.endsWith('%')) {
        mode = line;
      } else if (line.length > 0) {
        switch (mode) {
          case '%FILENAME%':
            ret.filename = line;
            break;
          case '%NAME%':
            ret.name = line;
            break;
          case '%BASE%':
            ret.base = line;
            break;
          case '%VERSION%':
            ret.version = line;
            const split = line.split('-');
            if (split.length >= 2) {
              ret.versionWoRev = split[0];
              ret.rev = split[1];
            }
            break;
          case '%DESC%':
            ret.desc = line;
            break;
          case '%CSIZE%':
            ret.csize = line;
            break;
          case '%ISIZE%':
            ret.isize = line;
            break;
          case '%MD5SUM%':
            ret.md5sum = line;
            break;
          case '%SHA256SUM%':
            ret.sha256sum = line;
            break;
          case '%URL%':
            ret.url = line;
            break;
          case '%LICENSE%':
            ret.license = line;
            break;
          case '%ARCH%':
            ret.arch = line;
            break;
          case '%BUILDDATE%':
            ret.builddate = new Date(parseInt(line) * 1000).toLocaleDateString();
            break;
          case '%PACKAGER%':
            ret.packager = line;
            break;
          case '%DEPENDS%':
            ret.depends = line;
            break;
          case '%MAKEDEPENDS%':
            ret.makedepends = line;
            break;
          case '%PROVIDES%':
            ret.provides = line;
            break;
          case '%CONFLICTS%':
            ret.conflicts = line;
            break;
          case '%REPLACES%':
            ret.replaces = line;
            break;
          case '%OPTDEPENDS%':
            ret.replaces = line;
            break;
          case '%CHECKDEPENDS%':
            ret.replaces = line;
            break;
          case '%GROUPS%':
            ret.groups = line;
            break;
          case '%PGPSIG%':
            ret.pgpsig = line;
            break;
          default:
            // nothing to do
            console.info('Skipping: ' + mode);
            break;
        }
      }
    }
    return ret;
  }
}

export default RepoParser;
