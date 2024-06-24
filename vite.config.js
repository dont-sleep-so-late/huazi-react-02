import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import requireTransform from "vite-plugin-require-transform"; // 1. 引入插件

export default defineConfig({
  plugins: [
    react(),
    // 2. 添加以下代码
    requireTransform({
      fileRegex: /.js$|.jsx$/,
    }),
  ],
});
