const { resolve, normalize, basename, relative, sep, join } = require('path')
const { promises } = require('fs')
const picomatch = require('picomatch')

function createOptions(file, relative2, root) {
  const options = {
    dir: file.replace(/(\*.*)|(\*.[a-z]{2})/g, ""),
    isRecursive: normalize(file).includes(sep + "**"),
    pattern: basename(file),
    relative: relative2,
    root
  };
  return options;
}
async function walk(options) {
  const rootDir = options.root, {dir, isRecursive, pattern} = options;
  const folders = await promises.readdir(join(rootDir, dir), {withFileTypes: true});

  const files = await Promise.all(folders.map((folder) => {
    const res = join(options.dir, folder.name);
    if (folder.isDirectory() && isRecursive) {
      return walk({...options, dir: res});
    }
    if (folder.isFile() && picomatch.isMatch(basename(res), pattern)) {
      return options.relative ? `.${sep}${relative(rootDir, res)}` : join(rootDir, res);
    }
  }));
  return Array.prototype.concat(...files.filter((files2) => files2));
}
async function globFiles(src, options = {}) {
  const { relative2 = false, root = resolve() } = options
  const files = Array.isArray(src) ? src : [src];
  const result = await Promise.all(files.map((file) => {
    const opts = createOptions(file, relative2, root)
    return walk(opts);
  }));
  return result.flat().filter((value) => value);
}

exports.globFiles = globFiles