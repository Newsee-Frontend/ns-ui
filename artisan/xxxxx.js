const path = require('path');
const fs = require('fs');
const Mock = require('mockjs');
const utils = require('../utils');
const bodyParser = require('body-parser');
const config = require(path.resolve('env.param.config'));

const mockEntry = config.base.mockEntry || './mock/index';

const apiConfig = require(utils.rootPath(mockEntry));

console.log('controllers-controllers')
const controllers = require('require-all')({
  dirname: path.resolve('./artisan/mocktest'),
})
const mockModule = Object.values(controllers) || []
console.log(mockModule);

module.exports = function (app) {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  // mockModule.forEach(module => {
  //   Object.keys(module).forEach(key => {
  //     console.log(key, module[key]);
  //     // app['post']('/system/permission/list-menu', module[key])
  //   });
  // })
};

// var pathName = path.resolve('./artisan/mocktest');
// console.log(pathName);
// var dirs = [];
// function (rep, res) {
//   let json = getJsonFile('list_menu.json');
//   res.json(Mock.mock(json));
// }


// fs.readdir(pathName, function (err, files) {
//   var dirs = [];
//   (function iterator(i) {
//     if (i == files.length) {
//       console.log('遍历完成！！');
//       console.log(dirs);
//
//
//
//
//       return;
//     }
//     fs.stat(path.join(pathName, files[i]), function (err, data) {
//       if (data.isFile()) {
//         dirs.push(files[i]);
//       }
//       iterator(i + 1);
//     });
//   })(0);
// })
//
// console.log(2222222222222);
