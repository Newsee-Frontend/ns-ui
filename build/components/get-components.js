const fs = require('fs');
const path = require('path');

const excludes = [
  'index.js',
  'index.less',
  'index.scss',
  'style',
  'mixins',
  'utils',
  '.DS_Store',
  // 'TestDemo',
];

module.exports = function() {
  //get all dirs or files in path（src/packages
  const dirs = fs.readdirSync(path.resolve('./src/packages'));
  // console.log('需要编译的文件名称');
  // console.log(dirs);
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1); //filter files
};
