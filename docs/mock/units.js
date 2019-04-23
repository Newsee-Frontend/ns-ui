const fs = require('fs');
const path = require('path');
/**
 * 读取json文件
 * @param filePath
 * @returns {any}
 */
exports.getJsonFile = function(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(__dirname, './data/' + filePath), 'utf-8'));
};
