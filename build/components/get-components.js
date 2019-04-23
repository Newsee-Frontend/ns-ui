const fs = require('fs');
const path = require('path');

const excludes = [
  'index.js',
  'index.less',
  'index.scss',
  'style',
  'mixins',
  'utils',
  '.DS_Store'
];

module.exports = function () {
  //获取 src/packages 下的所有以及目录文件夹的名称
  const dirs = fs.readdirSync(path.resolve('./src/packages'));
  console.log(path.resolve('./src/packages'));
  console.log('dirs-dirs-dirs');
  console.log(dirs);
  //过滤掉不要的名称
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1);
};
