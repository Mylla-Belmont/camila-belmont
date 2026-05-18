import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // CONFIGURAÇÃO AVANÇADA DE CHUNKS:
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Se o arquivo vier da pasta node_modules, joga ele num chunk separado
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
      },
    },
  },
})
