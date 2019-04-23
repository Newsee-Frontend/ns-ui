const path = require('path');
const config = require(path.resolve('env.param.config'));
const create = require('./components-style-entry');
const del = require('./del-stylecompile-file');
const components = require('../components/get-components')() || [];


/**
 * get a list of files to delete
 * delete style file / dir, ( lib,es/packages/component/style/xxxxx )',
 */
const delList = [
  // 'index.scss',
  // 'mixins.scss',
  // 'mixins.css',
  // 'modules',
  // 'transition'
  // '!index.css',
  '!(index.css)'
];

/**
 * get whether we need scss/less entry file
 */
let isneed;

try {
  isneed = config.plugin.style.needScssEntry;
}
catch (e) {
  isneed = false;
}


/**
 * run create style entry file and delete some files or folder in every components
 */
components.forEach(component => {
  //if we need scss style file , do not delete scss files
  if (!isneed) {
    del.delstylefiles(component, delList);
    // css entry
    create.destEntryFile(component, 'index.js', '.css');
  } else {
    // css entry
    create.destEntryFile(component, 'index.js', '.css');
    // scss entry
    create.destEntryFile(component, 'scss.js', '.scss');
  }
});

