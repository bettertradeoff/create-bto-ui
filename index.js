#!/usr/bin/env node
const path = require('path')
const fs = require('fs/promises')

const argv = require('minimist')(process.argv.slice(2))

async function init() {
  const { globFiles } = require('./glob')

  const targetDir = argv._[0] || '.'

  const cwd = process.cwd()
  const root = path.join(cwd, targetDir)

  console.log(`Scaffolding project in ${root}...`)

  const templateDir  = `template-${argv.t || argv.template || 'vue'}`
  const files = await globFiles(path.join(templateDir , '**/*'), { root: __dirname })

  for (const file of files) {
    const tempPath = file.replace(path.join(__dirname, templateDir ), '')
    const destPath = path.join(root, tempPath)
    await fs.mkdir(path.dirname(destPath), { recursive: true })
    await fs.copyFile(file, destPath)
  }

  const pkg = require(path.join(root, `package.json`))
  pkg.name = path.basename(root)

  await fs.writeFile(path.join(root, 'package.json'), JSON.stringify(pkg, null, 2))
  await fs.rename(path.join(root, '_gitignore'), path.join(root, `.gitignore`))

  const viteConfig = await fs.readFile(path.join(root, 'vite.config.ts'), 'utf-8')
  await fs.writeFile(path.join(root, 'vite.config.ts'), viteConfig.replace('<!--package-name--!>', pkg.name))

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log(`  npm install (or \`yarn\`)`)
  console.log()
}

init().catch(e => console.log(e))