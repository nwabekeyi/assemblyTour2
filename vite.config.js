// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",          // important for root deployment
  build: {
    outDir: "dist"    // must match vercel.json distDir
  }
});
