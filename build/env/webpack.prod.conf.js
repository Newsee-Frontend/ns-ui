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
    'ns-ui': './es/index.js',
  },
  output: {
    path: path.resolve('./lib'),
    library: 'ns-ui',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  performance: false,//配置如何展示性能提示。例如，如果一个资源超过 250kb，webpack 会对此输出一个警告来通知你
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
    },
    'element-ui': 'element-ui',
    // 'vxe-table': 'vxe-table',
  },
  optimization: {
    minimize: isMinify,
  },
});


module.exports = prodWebpackConfig;
