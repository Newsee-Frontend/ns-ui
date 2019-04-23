'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');


// const isMinify = process.argv.indexOf('-p') !== -1;
const isMinify = process.env.ISMIN === 'true';
const baseWebpackConfig = require('../basic/webpack.base.conf');


const prodWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  entry: {
    'ns-ui': './es/index.js'
  },
  output: {
    path: path.resolve('./lib'),
    library: 'ns-ui',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  performance: false,//配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你
  /**
   * 如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，
   * 那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
   */
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  optimization: {
    minimize: isMinify
  }
});


module.exports = prodWebpackConfig;
