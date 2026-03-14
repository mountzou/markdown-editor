import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages: use relative base so the app works at any path (e.g. / or /markdown-editor/)
  base: './',
})
