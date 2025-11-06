import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: ['./src/setup.js'],
  coverage: {
    enabled: true,
    provider: 'v8',
    reporter: ['html', 'text', 'json'],
    all: true,
    include: ['src/**/*.{js,jsx}'],
    exclude: ['node_modules/', 'src/tests/', 'src/setup.js']
  }
}
})
