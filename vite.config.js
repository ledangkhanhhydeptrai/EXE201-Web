import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://bookingpetservice.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  base: "/",
});
