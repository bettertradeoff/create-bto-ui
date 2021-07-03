import { readdir } from 'fs/promises'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import { Response, Request, NextFunction } from 'express'

import vuePlugin from '@vitejs/plugin-vue'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfig from './tsconfig.json'

const paths = tsconfig.compilerOptions.paths || {}

export default defineConfig({
  root: '../bto-ui-shell',
  resolve: {
    alias: Object.keys(paths).reduce((prev, cur) => {
      prev[cur] = resolve(paths[cur][0])
      return prev
    }, {})
  },
  optimizeDeps: {
    include: [ 'redux', 'react', 'react-dom' ]
  },
  plugins: [ 
    vuePlugin(),
    reactRefresh(),
    {
      name: 'vite:mock',
      enforce: 'pre',
      configureServer({ middlewares }) {
        const middleware = async (req: Request, res: Response, next: NextFunction) => {
          if (req.url.includes('/config.json')) {
            const stores = await readdir('../bto-ui-store/src')
            const excludes = ['types', 'index.ts']
            return res.end(JSON.stringify({  
              "routes": [
                { "path": "/", "component": resolve('../<!--package-name--!>/src/main')  }
              ],
              "stores": stores
                .filter(store => (!excludes.includes(store)))
                .map(store => ({ 
                  "id": store.toUpperCase(), 
                  "module": resolve(`../bto-ui-store/src/${store}/src/index`)
                }))
            }))
          }
          next()
        }
        middlewares.use(middleware)
      }
    }
  ]
})