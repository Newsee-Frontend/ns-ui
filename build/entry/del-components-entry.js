const fs = require('fs-extra');
const path = require('path');
const comEntryUtils = require('./utils');

console.log('== 删除各个组件的入口文件 ==');

/**
 * del all components entry file
 * @param dir
 */
function delComponentsEntry(dir) {
  comEntryUtils.ComponentsList().forEach(component => {
    const target = path.resolve(`./${dir}/packages/${component}/index.js`);
    //delete every component entry file first
    fs.remove(target, function (err) {
      if (err) console.log(err);
    });
  });
}

//del all components entry file
delComponentsEntry('src');
