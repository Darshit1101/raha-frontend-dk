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



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       axiosApi: path.resolve(__dirname, "src/axiosApi"),
//       components: path.resolve(__dirname, "src/components"),
//       utils: path.resolve(__dirname, "src/utils"),
//       hooks: path.resolve(__dirname, "src/hooks")
//     }
//   }
// });

