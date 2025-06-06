import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      axiosApi: path.resolve(__dirname, "src/axiosApi"), // <-- This matches your folder!
      // Add other aliases if needed
    },
  },
});
