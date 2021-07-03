(async function() {
  const fs = require('fs')
  const path = require('path')

  const tsconfig = require('../tsconfig.json')
  const pkg = require('../package.json')

  const pkgFolder = (name) => 
  `../.cache/${name.replace('@', '').replace('/', '-')}`

  const unLinkNodeModules = (nodePath) => {
    try {
      const stat = fs.lstatSync(nodePath)
      if (stat.isSymbolicLink()) {
        fs.unlinkSync(nodePath)
      }
    } catch (error) { }
  }
  
  unLinkNodeModules('node_modules')

  const pkgTempNodeModules = pkgFolder(pkg.name)
  fs.existsSync(pkgTempNodeModules) 
    && fs.renameSync(pkgTempNodeModules, 'node_modules')

  if (tsconfig.compilerOptions.paths) {
    const paths = Object.keys(tsconfig.compilerOptions.paths)

    const pkgs = paths.reduce((prev, cur) => {
      const tsconfigPath = tsconfig.compilerOptions.paths[cur][0]
      const pkgPath = path.join('..', tsconfigPath.split(path.sep)[1], 'node_modules')
      if (fs.existsSync(pkgPath)) {
        prev.push(pkgPath)
      }
      return prev
    }, [])

    for (const pkg of pkgs) {
      unLinkNodeModules(pkg)

      const pkgJson = require(path.join('..', pkg.replace(path.sep + 'node_modules', ''), 'package.json'))
      const folder = pkgFolder(pkgJson.name)
      fs.existsSync(folder)
        && fs.renameSync(folder, pkg)
    }
  }
})()