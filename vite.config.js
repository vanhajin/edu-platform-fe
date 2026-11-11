import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const authUrl = env.VITE_AUTH_URL ? new URL(env.VITE_AUTH_URL) : null

  return {
    plugins: [react()],
    server: {
      port: 8686,
      proxy: authUrl
        ? {
            '/auth-proxy': {
              target: authUrl.origin,
              changeOrigin: true,
              rewrite: (path) =>
                path.replace('/auth-proxy', authUrl.pathname.replace(/\/$/, '')),
            },
          }
        : undefined,
    },
  }
})
