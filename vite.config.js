import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // `vite dev` doesn't run the serverless functions in /api, so mirror the
      // lyrics proxy straight onto LRCLIB here. Same URL shape as production,
      // so the app code doesn't need a localhost special case.
      '/api/lrclib': {
        target: 'https://lrclib.net',
        changeOrigin: true,
        rewrite: (path) => {
          const params = new URLSearchParams(path.split('?')[1] || '')
          const endpoint = params.get('endpoint') === 'get' ? 'get' : 'search'
          params.delete('endpoint')
          return `/api/${endpoint}?${params}`
        },
      },
    },
  },
})
