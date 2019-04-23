// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    "postcss-import": {},
    "postcss-url": {},
    autoprefixer: {
      browsers: [
        "> 1%",
        "last 2 versions",
        "not ie <= 8",
        "ios >= 8",
        "android >= 4.0"
      ]
    }
  }
};
