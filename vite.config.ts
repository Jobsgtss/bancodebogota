import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5190,
    strictPort: true,
    allowedHosts: true,
    watch: {
      usePolling: true,
      interval: 400,
    },
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
