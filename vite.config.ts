import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      quoteStyle: "double",
      generatedRouteTree: "./src/routeTree.gen.ts",
      routesDirectory: "./src/routes",
    }),
    react(),
    tailwindcss(),
  ],
  server: {
    watch: {
      ignored: ["**/routeTree.gen.ts"],
    },
  },
})
