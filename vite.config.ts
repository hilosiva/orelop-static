import path from "path";
import { viteHtmlLoader } from "@hilosiva/vite-plugin-html-loader";
import { viteImageOptimazer } from "@hilosiva/vite-plugin-image-optimizer";
import { defineConfig } from "vite";
import vaultcss from "vite-plugin-vaultcss";

const dir = {
  src: "src",
  publicDir: "public",
  outDir: "dist",
};

export default defineConfig({
  root: dir.src,
  publicDir: `../${dir.publicDir}`,
  plugins: [
    viteHtmlLoader(),
    viteImageOptimazer({
      generate: {
        preserveExt: true,
      },
    }),
    vaultcss(),
  ],
  build: {
    outDir: `../${dir.outDir}`,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/scripts/[name]-[hash].js",
        chunkFileNames: "assets/scripts/[name]-[hash].js",
        assetFileNames: ({ names }) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(names[0] ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(names[0] ?? "")) {
            return "assets/styles/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
    assetsInlineLimit: 0,
    write: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  server: {
    open: true,
  },

  css: {
    devSourcemap: true,
  },
});
