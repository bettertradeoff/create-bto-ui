(async function() {
  const path = require('path')
  const fs = require('fs')

  const tsconfig = require('../tsconfig.json')
  const pkgJson = require('../package.json')

  if (tsconfig.compilerOptions.paths) {
    const paths = Object.keys(tsconfig.compilerOptions.paths)

    const pkgs = paths.reduce((prev, cur) => {
      const tsconfigPath = tsconfig.compilerOptions.paths[cur][0]
      const pkgPath = path.join('..', tsconfigPath.split(path.sep)[1], 'package.json')
      if (fs.existsSync(pkgPath)) {
        const pkg = require(path.join('..', pkgPath))
        const packages = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) }
        prev = { ...prev, ...packages }
      }
      return prev
    }, {})
    
    const folder = path.join('..', '.cache')
    const pkgFile = path.join(folder, 'package.json')

    const gitignore = '.gitignore'
    const gitignorePath = path.join(folder, gitignore)

    fs.mkdirSync(folder, { recursive: true })
    fs.writeFileSync(pkgFile, JSON.stringify({ 
      "name": "deps", 
      "devDependencies": { 
        ...pkgs, 
        ...(pkgJson.devDependencies || {}) 
      } 
    }, null, 2))
    fs.copyFileSync(gitignore, gitignorePath)
  }
})()