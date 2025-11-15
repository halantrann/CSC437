import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),

        // DISH: handles all individual dishes
        meal: resolve(__dirname, 'meal.html'),

        // DISH: handles all individual dishes
        dish: resolve(__dirname, 'dish.html'),

        // TASTES: handles all taste profiles
        taste: resolve(__dirname, 'taste.html'),

        // CUISINE: handles all cuisines
        cuisine: resolve(__dirname, 'cuisine.html'),

        // AUTH PAGES 
        login: resolve(__dirname, 'login.html'),
        newuser: resolve(__dirname, 'newuser.html'),
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000"
    }
  }
})

// DEADBEEF: for ts 