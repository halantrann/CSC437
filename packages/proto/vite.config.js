import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        meals: resolve(__dirname, 'meals/breakfast.html'),
        breakfast_dish1: resolve(__dirname, 'pandanwaffles.html'),
      },
    },
  },
})