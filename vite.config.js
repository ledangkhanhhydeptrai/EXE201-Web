import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    historyApiFallback: true, // Fix lỗi 404 khi refresh
  },
  plugins: [react()],
  base: "/",
});
