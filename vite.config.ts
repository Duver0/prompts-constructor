import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico"],
      manifest: {
        name: "Prompt Architect",
        short_name: "PromptArch",
        description: "Visual prompt engineering platform",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/zustand") || id.includes("node_modules/immer")) {
            return "state";
          }
          if (id.includes("node_modules/animejs")) {
            return "anime";
          }
        },
      },
    },
    sourcemap: false,
    target: "es2020",
  },
  server: {
    port: 3000,
    open: true,
  },
});
