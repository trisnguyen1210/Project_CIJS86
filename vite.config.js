import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Project_CIJS86",
  build: {
    chunkSizeWarningLimit: 1600
  },
  plugins: [react()],
})
