import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/sanity-react-cms-app/",
  plugins: [react()],
});
