import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: 'ems-firebase/', // MUST match your repo name
  plugins: [react()],
});
