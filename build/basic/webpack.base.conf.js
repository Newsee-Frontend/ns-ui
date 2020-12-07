'use strict';
const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//编译进度条 插件
// const {VueLoaderPlugin} = require('vue-loader');

const rules = require("./webpack.rules.conf.js");

module.exports = {
  //https://www.webpackjs.com/configuration/stats/
  stats: {
    modules: false,
    children: false
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      packages: path.join(__dirname, '../packages')
    }
  },
  module: {
    rules: [...rules]
  },
  plugins: [
    // new VueLoaderPlugin(),
    new ProgressBarPlugin(),
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
