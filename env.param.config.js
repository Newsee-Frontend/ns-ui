'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');
const frameState = require('./frametest/switch');


module.exports = {
  dev: {
    // Paths
    assetsPublicPath: '/',// 编译根目录
    assetsSubDirectory: 'static',// 编译二级目录
    proxyTable: {},
    contentBase: path.join(__dirname, '../dist'),       //"./dist/"
    host: 'localhost',
    port: 8096,
    inline: true,
    autoOpenBrowser: true,
    errorOverlay: true,
    hot: true,
    quiet: true,
    /**
     * Source Maps
     */
    devtool: 'cheap-module-eval-source-map',
    notifyOnErrors: true,
    poll: false,
    useEslint: true,
    showEslintErrorsInOverlay: false,
    usePostCSS: true,
    /** Source Maps */
    devCssSourceMap: false,
    devJsSourceMap: false,
    cacheBusting: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, './dist/index.html'),
    assetsPublicPath: '/', // 编译发布的根目录
    assetsRoot: path.resolve(__dirname, './dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    favicon: path.resolve('./favicon.ico'),//favicon
    devtool: '#source-map',
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    extract: true,
    usePostCSS: true,
    /** Source Maps */
    prodCssSourceMap: false,
    prodJsSourceMap: false,
    cacheBusting: true,
  },
  base: {
    entry: {
      app: frameState.frameSwitch ? './frametest/main.js' : './src/main.js'
    },
    themeConfig: {
      switch: false,
      type: 'less',
      theme: require(path.resolve('core/basic/style/theme/normal'))
    },
    aliasPath: [
      {name: '@_core', path: 'core'},
      {name: '@_core_style', path: 'core/basic/style'},
      {name: '@_frame', path: 'frametest'},
      {name: '@_ui_cover', path: 'core/basic/style/UI-cover/vantui-cover.scss'},
      {name: '@_ui_public', path: 'core/basic/style/Public.scss'}
    ],
    sassResources: [
      // path.resolve('src/assets/css/Mixin/index.scss'),
      // path.resolve('src/assets/css/_var.scss')
    ],
    prettier: {
      switch: true,
      files: ['src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}', 'mock/**/*.{js,ts,json}']
    }
  }
};
