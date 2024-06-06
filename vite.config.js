import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
    define: {} ,
  };

  if (mode === "development") {
    config.define.global = {};
  }

  return config;
});