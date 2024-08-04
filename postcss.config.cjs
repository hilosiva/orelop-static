module.exports = {
  plugins: [
    require("@hilosiva/postcss-transore"),
    require("postcss-preset-env"),
    require("autoprefixer"),
    require("css-declaration-sorter")({
      order: "smacss", // alphabetical/ smacss / concentric-css
    }),
    require("postcss-sort-media-queries"),
  ],
};
