const fs = require('fs-extra');
const path = require('path');
const comEntryUtils = require('./utils');

console.log('== 重命名各个组件文件 ==');

/**
 * rename all components entry file
 * @param dir
 * @param oldname
 * @param newname
 */
function renameComponentsEntry(dir, oldname, newname = null) {
  comEntryUtils.ComponentsList().forEach(component => {
      const basePath = `./${dir}/packages/${component}/`;
      const oldtarget = path.resolve(`${basePath}${oldname}`);
      const newtarget = path.resolve(`${basePath}${ newname ? newname : component + '.vue'}`);
      //delete every component entry file first
      fs.rename(oldtarget, newtarget, function (err) {
        if (err) {
          console.log(err);
        }
        else {
          console.log('====== success =====');
        }
      });
    }
  );
}

//rename all components entry file
renameComponentsEntry('src', 'index.vue');
