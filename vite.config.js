import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "mfCRM2",
      filename: "remoteEntry.js",
      exposes: {
        "./CRM2App": "./src/bootstrap",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  esbuild: {
    loader: "jsx",
  },
  build: {
    target: "esnext",
  },
  server: {
    port: 3000,
  },
  base: "Home",
});
