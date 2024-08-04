module.exports = {
  plugins: [
    require("@hilosiva/postcss-transore", {
      minViewPort: 320,
      maxViewPort: 1440,
    }),
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("css-declaration-sorter")({
      order: "smacss", // alphabetical/ smacss / concentric-css
    }),
    require("postcss-sort-media-queries"),
  ],
};
