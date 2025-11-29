import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/setupTests.js'],
    transformMode: {
      web: [/\.[jt]sx?$/]
    },
    // Inline some ESM packages so Vitest transforms them correctly during tests
    deps: {
      inline: [
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
        'recharts',
        'react-router-dom'
      ]
    }
  },
  // Ensure Vite doesn't externalize certain packages for SSR during tests
  ssr: {
    noExternal: ['@mui/material', '@emotion/react', '@emotion/styled', 'recharts']
  }
})

