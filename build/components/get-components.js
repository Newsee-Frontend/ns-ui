const fs = require('fs');
const path = require('path');
const config = require(path.resolve('env.param.config'));


const excludes = config.plugin.excludes;

module.exports = function() {
  //get all dirs or files in path（src/packages
  const dirs = fs.readdirSync(path.resolve('./src/packages'));
  // console.log('需要编译的文件名称');
  // console.log(dirs);
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1); //filter files
};
