module.exports = {
  plugins: [
    require("@hilosiva/postcss-transore"),
    require("postcss-nesting"),
    require("autoprefixer")({
      grid: "autoplace", // IE11対応
    }),
    require("css-declaration-sorter")({
      order: "smacss", // alphabetical/ smacss / concentric-css
    }),
    require("postcss-sort-media-queries"),
  ],
};
