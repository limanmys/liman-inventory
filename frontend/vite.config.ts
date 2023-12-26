import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import mkcert from "vite-plugin-mkcert"
import eslint from "@nabla/vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), mkcert(), eslint()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "src/main.ts",
    },
    outDir: "../public/vite",
    chunkSizeWarningLimit: 999999999,
  },
})
