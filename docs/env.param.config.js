'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    entry: {
      app: './src/main.js',
    },
    // Paths
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsSubDirectory: 'static', // 编译输出的二级目录
    proxyTable: {},
    contentBase: path.join(__dirname, '../dist'), //"./dist/"

    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8066, //端口号
    inline: true,
    autoOpenBrowser: true, //是否自动打开浏览器
    errorOverlay: true, //当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。
    hot: true, //热启动
    quiet: true, //启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    usePostCSS: true, //补全css代码的兼容性前缀
    /** Source Maps */
    devCssSourceMap: false, // 是否开启 cssSourceMap
    devJsSourceMap: false, // 是否开启 jsSourceMap
    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,
  },
  build: {
    entry: {
      app: './src/main.js',
    },
    // Template for index.html
    index: path.resolve(__dirname, './dist/index.html'),
    // Paths
    assetsPublicPath: './', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve(__dirname, './dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    favicon: path.resolve('./favicon.ico'), //favicon
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true, // 是否开启 gzip
    productionGzipExtensions: ['js', 'css'], // 需要使用 gzip 压缩的文件扩展名

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report || false,

    extract: true, //是否需要分离出js中的css代码,然后分别进行打包
    usePostCSS: true, //补全css代码的兼容性前缀
    useEslint: false,
    /** Source Maps */
    prodCssSourceMap: false, // 是否开启 cssSourceMap
    prodJsSourceMap: false, // 是否开启 jsSourceMap
    cacheBusting: true,
  },
  base: {
    entry: {
      app: './src/main.js',
    },
    aliasPath: [{name: '@core', path: 'core'}],
    sassResources: [
      // path.resolve('src/assets/css/Mixin/index.scss'),
      // path.resolve('src/assets/css/_var.scss')
    ],
    prettier: {
      switch: true,
      files: [
        'mock/**/*.js',
        '.postcssrc.js',
        'env.config.js',
        'env.param.config.js',
        '.eslintrc.js'
      ],
    },
  },
};
