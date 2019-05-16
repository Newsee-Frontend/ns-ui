'use strict';
const path = require('path');
const package_19_5_16 = require('./version/package_19_5_16');


module.exports = {
  dev: {
    entry: './artisan/src/main.js',
    templateSPA: './artisan/index.html',
    staticPath: './artisan/static',
    port: 8066,
    useEslint: false,
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
    excludes: package_19_5_16,
  },
  base: {
    mockPath: './artisan/mock',

    JSBabelInclude: ['src', 'mock', 'test', 'artisan'],

    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('artisan/src'),
    },

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
