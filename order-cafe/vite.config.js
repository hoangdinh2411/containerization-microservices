import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// add PATH to absolute imports on Vite js

const path = require("path");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
  },
  // add the below texts to absolute imports on Vite js
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
  // ...
});
