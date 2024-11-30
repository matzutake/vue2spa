import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
        @use "@/assets/sass/main.sass" as *
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
