import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// import virtual from './src/plugins/virtual-module'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3100,
    proxy: {
      '/api': {
        target: 'http://localhost:3101',
        changeOrigin: true,
        // rewrite: (path: string) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react(), svgr()],
})
