const path = require('path');
const Mock = require('mockjs');
const bodyParser = require('body-parser');
const fs = require('fs');//引入文件系统模块


/**
 * 读取json文件
 * @param filePath
 * @returns {any}
 */
function getJsonFile(filePath) {
  //读取指定json文件
  // var json = fs.readFileSync(path.resolve(__dirname, './data/' + filePath), 'utf-8');
  var json = fs.readFileSync(path.resolve('./artisan/mock/data/' + filePath), 'utf-8');
  console.log(111111111);
  console.log(JSON.parse(json))
  //解析并返回
  return JSON.parse(json);
};

getJsonFile('list_menu.json');



const files = require.context('./mocktest/', true, /\.js/);

let modules = [];

console.log(88888888888888888);
console.log(files.keys());

files.keys().forEach(key => {
  // var mk = key.replace(/(^\.\/|\.js$)/g, '')
  const m = files(key);
  const item = Object.keys(m).reduce((s, e) => {
    if (e !== 'default') {
      if (Array.isArray(m[e])) {
        modules = modules.concat(m[e]);
        return s
      } else s[e] = m[e]
    }
    return s
  }, m.default || {});
  if (item && item.path) modules.push(item)
});
console.log(modules);
