import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { transformWithOxc } from "vite";

// Plugin personalizado: transforma archivos .js con JSX usando oxc con lang:"jsx"
// Esto intercepta ANTES de que vite:oxc los rechace (oxc excluye .js por defecto)
const jsxInJsPlugin = {
  name: "jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.includes("node_modules") && id.endsWith(".js")) {
      return transformWithOxc(code, id, {
        lang: "jsx",
        jsx: { runtime: "automatic" },
      });
    }
  },
};

export default defineConfig({
  plugins: [
    jsxInJsPlugin,
    react(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.js"],
    css: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});