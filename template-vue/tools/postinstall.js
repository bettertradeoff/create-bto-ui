(async function() {
  const fs = require('fs')
  const path = require('path')

  const tsconfig = require('../tsconfig.json')
  const pkg = require('../package.json')

  const cache = '../.cache/node_modules'
  const node_modules = 'node_modules'

  const pkgFolder = (name) => 
    `../.cache/${name.replace('@', '').replace('/', '-')}`

  if (tsconfig.compilerOptions.paths) { 
    const paths = Object.keys(tsconfig.compilerOptions.paths)

    const pkgs = paths.reduce((prev, cur) => {
      const tsconfigPath = tsconfig.compilerOptions.paths[cur][0]
      const pkgPath = path.join('..', tsconfigPath.split(path.sep)[1], node_modules)
      prev.push(pkgPath)
      return prev
    }, [])

    for (const pkgPath of pkgs) {
      const pkgJson = require(
        path.join('..', pkgPath.replace(path.sep + node_modules, ''), 'package.json')
      )
      fs.existsSync(pkgPath) 
        && fs.renameSync(pkgPath, pkgFolder(pkgJson.name))

      fs.symlinkSync(cache, pkgPath, 'dir')
    }
  }

  fs.renameSync(node_modules, pkgFolder(pkg.name))
  fs.symlinkSync(cache, node_modules, 'dir')
})()