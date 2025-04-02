import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist"
  },
  server: {
    fs: {
      allow: [".."] // Cho phép truy cập file ngoài thư mục dự án (nếu cần)
    }
  }
});
