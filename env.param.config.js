'use strict';
const path = require('path');

const package_19_07_03 = require('./version/neap/package_19_07_03');

// const package_saas_19_12_18 = require('./version/saas/package_saas_19_12_18');


module.exports = {
  dev: {
    entry: './artisan/src/main.js',
    templateSPA: './artisan/index.html',
    staticPath: './artisan/static',
    port: 8066,
    useEslint: false,
  },
  prod: {
    entry: './artisan/src/main.js',
    templateSPA: './artisan/index.html',
    staticPath: './artisan/static',
    assetsPublicPath: '/', // 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    assetsRoot: path.resolve('./dist'), // 编译输出的静态资源路径
    assetsSubDirectory: 'static', // 编译输出的二级目录
    favicon: path.resolve('./artisan/favicon.ico'), //favicon
  },
  plugin: {
    style: {
      needScssEntry: false,
      lesspath: [
        // path.resolve('es/packages/**/*.less'),
        // path.resolve('lib/packages/**/*.less'),
        path.resolve('es/packages/**/style/index.less'),
        path.resolve('lib/packages/**/style/index.less'),

        path.resolve('es/index.less'),
        path.resolve('lib/index.less'),
      ],
      scsspath: [
        path.resolve('es/packages/**/style/index.scss'),
        path.resolve('lib/packages/**/style/index.scss'),

        path.resolve('es/index.scss'),
        path.resolve('lib/index.scss'),

      ],
    },
    excludes: package_19_07_03, //package_saas_19_8_30,
  },
  base: {
    mockPath: './artisan/mock',

    JSBabelInclude: [
      'src', 'mock', 'test', 'artisan',
      '/node_modules/element-ui/src',
      '/node_modules/element-ui/packages',
    ],

    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('artisan/src'),
    },

    prettier: {
      switch: false,
      files: [
        'src/**/*.{vue,less,scss,css,js,jsx,ts,tsx,json}',
        'artisan/mock/*.{js,ts,json}',
        'artisan/src/*.{js,ts,json}',
        'script/**/*.{js,ts,json}',
      ],
    },
  },
  tools: {
    publish: {
      prescript: [
        'npm run build:lib',
      ],
    },
    npmUpgradeList: [
      {
        module: 'neap-test1',
        edition: 'beta',//beta / latest
        version: null,
      },
      {
        module: 'cx-builder',
        edition: 'latest',//beta / latest
        version: null,
      },
    ],
  },
};
