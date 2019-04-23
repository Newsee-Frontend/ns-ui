/* eslint-disable no-use-before-define */
/**
 * Build style entry of all components
 */

const fs = require('fs-extra');
const path = require('path');
const dependencyTree = require('dependency-tree');
const components = require('../components/get-components')();


//白名单内的组件只引入公共base.css的样式，其余的组件还需引入自身的样式
const whiteList = [
  'info',
  'icon',
  'loading',
  'cell',
  'cell-group',
  'button',
  'overlay'
];
const dir = path.resolve('./es/packages');

// analyze component dependencies
function analyzeDependencies(component) {
  const checkList = ['base'];

  search(
    dependencyTree({
      directory: dir,
      filename: path.join(dir, component, 'index.js'),
      filter: path => !~path.indexOf('node_modules')
    }),
    component,
    checkList
  );

  if (!whiteList.includes(component)) {
    checkList.push(component);
  }

  return checkList.filter(item => checkComponentHasStyle(item));
}

function search(tree, component, checkList) {
  Object.keys(tree).forEach(key => {
    search(tree[key], component, checkList);
    components
      .filter(item => (
        key
          .replace(dir, '')
          .split('/')
          .includes(item)
      ))
      .forEach(item => {
        if (
          !checkList.includes(item) &&
          !whiteList.includes(item) &&
          item !== component
        ) {
          checkList.push(item);
        }
      });
  });
}

function getStylePath(component, ext = '.css') {
  if (component === 'base') {
    return path.resolve(`./es/style/base${ext}`);
  }
  return path.resolve(`./es/packages/${component}/style/index${ext}`);
}

function getStyleRelativePath(component, style, ext) {
  return path.relative(
    path.resolve(`./es/packages/${component}/style`),
    getStylePath(style, ext)
  );
}

function checkComponentHasStyle(component) {
  return fs.existsSync(getStylePath(component));
}

/**
 * create dest entry File
 * @param component
 * @param filename
 * @param ext
 */
exports.destEntryFile = (component, filename, ext = '') => {
  const deps = analyzeDependencies(component).map(dep => (
    getStyleRelativePath(component, dep, ext)
  ));

  const esEntry = path.join(dir, component, `style/${filename}`);
  const libEntry = path.join(
    __dirname,
    '../../lib/packages',
    component,
    `style/${filename}`
  );
  const esContent = deps.map(dep => `import '${dep}';`).join('\n');
  const libContent = deps.map(dep => `require('${dep}');`).join('\n');

  fs.outputFileSync(esEntry, esContent);
  fs.outputFileSync(libEntry, libContent);
};
