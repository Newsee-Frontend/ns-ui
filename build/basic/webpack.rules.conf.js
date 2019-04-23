const path = require('path');
const utils = require('../utils');
const rules = [
  {
    test: /\.vue$/,
    use: [
      {
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      }
    ]
  },
  {
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
  },
  {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          paths: [path.resolve(__dirname, 'node_modules')]
        }
      }
    ]
  },
  {
    test: /\.md$/,
    use: [
      'vue-loader',
      '@vant/markdown-loader'
    ]
  },
  {
    test: /\.(ttf|svg)$/,
    loader: 'url-loader'
  }
];




module.exports = rules;
