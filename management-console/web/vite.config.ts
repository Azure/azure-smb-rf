import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/node_modules/@azure/msal-")) return "msal";
          if (id.includes("/node_modules/@fluentui/")) return "fluent";
          if (id.includes("/node_modules/@tanstack/react-query/")) return "query";
          if (
            /\/node_modules\/(react|react-dom|react-router|react-router-dom)\//.test(
              id,
            )
          ) {
            return "react";
          }
        },
      },
    },
  },
});
