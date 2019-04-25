'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsSubDirectory: 'static',// 编译输出的二级目录
    proxyTable: {},
    contentBase: path.join(__dirname, '../dist'),       //"./dist/"
    host: 'localhost',
    port: 8022,
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
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve(__dirname, './dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report || false,
    extract: true,
    usePostCSS: true,
    useEslint: true,
    /** Source Maps */
    prodCssSourceMap: false,
    prodJsSourceMap: false,
    cacheBusting: true,
  },
  plugin: {
    style: {
      needScssEntry: false,
      lesspath: [
        // path.resolve('es/packages/**/*.less'),
        // path.resolve('lib/packages/**/*.less'),
        path.resolve('es/packages/**/style/index.less'),
        path.resolve('lib/packages/**/style/index.less'),
        path.resolve('es/packages/index.less'),
        path.resolve('lib/packages/index.less'),
      ],
      scsspath: [
        path.resolve('es/packages/**/style/index.scss'),
        path.resolve('lib/packages/**/style/index.scss'),
        path.resolve('es/packages/index.scss'),
        path.resolve('lib/packages/index.scss'),
      ],
    },
    staticPath: './static',
  },
  base: {
    entry: {
      app: './artisan/src/main.js',
    },
    JSinclude: ['src', 'mock', 'test', 'artisan'],
    templateSPA: './artisan/index.html',
    staticPath: './artisan/static',
    mockPath: './artisan/mock',
    aliasPath: [
      { name: '@', path: path.resolve('./artisan/src') },
    ],
    sassResources: [],
    prettier: {
      switch: false,
      files: [
        'src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}',
        'artisan/**/*.{js,ts,json}',
        'script/**/*.{js,ts,json}',
      ],
    },
  },
};
