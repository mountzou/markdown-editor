import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const baseUrl = env.VITE_APP_URL ?? ''

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            baseUrl,
          },
        },
      }),
    ],
    // GitHub Pages: use relative base so the app works at any path (e.g. / or /markdown-editor/)
    base: './',
  }
})
