/**
 * Build npm src
 */
const path = require('path');
const glob = require('glob');
const shell = require('shelljs');
const signale = require('signale');
const {Signale} = signale;

const config = require(path.resolve('env.param.config'));
const lesspath = config.plugin.style.lesspath;
const scsspath = config.plugin.style.scsspath;


const p = path.resolve(__dirname, './compile-style.js');
const msg = 'compile style in lib && es dir';

signale.start(msg);

const interactive = new Signale({interactive: true});
interactive.pending(msg);


shell.exec(`gulp --lesspath ${lesspath} --scsspath ${scsspath} --gulpfile ${p}`, function (error, stdout, stderr) {
  signale.success(msg);
});




