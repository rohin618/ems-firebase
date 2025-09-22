import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'ems-project' with your actual repo name
export default defineConfig({
  base: '/ems-firebase/',
  plugins: [react()],
})
