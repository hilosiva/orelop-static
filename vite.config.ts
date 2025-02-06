import path from "path";
import { viteHtmlOreder } from "@hilosiva/vite-plugin-html-oreder";
import { viteImageOretimaizer } from "@hilosiva/vite-plugin-image-oretimaizer";
import browserslist from "browserslist";
import { browserslistToTargets, composeVisitors } from "lightningcss";
import fluidVisitor from "lightningcss-plugin-fluid";
import { defineConfig } from "vite";
import sassGlobImports from "vite-plugin-sass-glob-import";

const dir = {
  src: "src",
  publicDir: "public",
  outDir: "dist",
};

export default defineConfig({
  root: dir.src,
  // base: "./",
  publicDir: `../${dir.publicDir}`,
  plugins: [
    viteHtmlOreder(),
    viteImageOretimaizer({
      generate: {
        preserveExt: true,
      },
    }),
    sassGlobImports(),
  ],
  build: {
    outDir: `../${dir.outDir}`,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.( gif|jpeg|jpg|png|svg|webp| )$/.test(name ?? "")) {
            return "assets/img/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.js$/.test(name ?? "")) {
            return "assets/js/[name]-[hash][extname]";
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
    transformer: "lightningcss",
    lightningcss: {
      drafts: {
        customMedia: true,
      },
      targets: browserslistToTargets(browserslist("> 0.3%, Firefox ESR, not dead")),
      visitor: composeVisitors([fluidVisitor()]),
    },
    devSourcemap: true,
  },
});
