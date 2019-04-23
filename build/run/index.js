/**
 * Build npm src
 */
const shell = require('shelljs');
const signale = require('signale');
const {Signale} = signale;

const tasks = [
  'bootstrap',
  'lint',
  'build:entry',//生成总入口文件
  'build:style-entry',//生成所有组件的样式入口文件
  'build:components',//生成 lib es 文件夹目录及其文件
  'build:style',//编译样式文件
  'build:components-style-entry',//生成组件内样式入口文件
  'build:components-entry',//生成各个组件的 入口文件
  'build:cx',//生成所有UI的打包压缩文件js

  // 'del:components-entry',//删除各个组件的入口文件
  // 'build:copy'
];

tasks.forEach(task => {
  signale.start(task);

  const interactive = new Signale({interactive: true});
  interactive.pending(task);
  shell.exec(`npm run ${task} --silent`);
  interactive.success(task);
});
