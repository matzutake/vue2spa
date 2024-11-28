import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `
        @import "@/assets/sass/variables.sass"
        @import "@/assets/sass/mixins.sass"
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
