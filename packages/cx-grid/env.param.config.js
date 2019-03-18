'use strict';
const path = require('path');

module.exports = {
  plugin: {
    entry: {
      app: './src/index.js'
    },
    outputFilename: 'cx-grid',
    outputLibrary: 'CxGrid',
    // Paths
    assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve(__dirname, './dist'),// 编译输出的静态资源路径
    assetsSubDirectory: 'static',// 编译输出的二级目录
    devtool: '#source-map',
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,
    extract: true,//是否需要分离出js中的css代码,然后分别进行打包
    usePostCSS: true,//补全css代码的兼容性前缀
    useEslint: false,
    /** Source Maps */
    prodCssSourceMap: false,// 是否开启 cssSourceMap
    prodJsSourceMap: false,// 是否开启 jsSourceMap
    cacheBusting: true
  },
  base: {
    aliasPath: [
      {name: '@core', path: 'core'}
    ],
    sassResources: []
  }
};
