/// <reference types="vitest" />
import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "happy-dom",
  },

  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
});
