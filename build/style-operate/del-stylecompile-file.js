/**
 * del compile style files
 */
const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const signale = require('signale');

exports.delstylefiles = (component, delList = []) => {
  signale.start('start delete style files ...');

  // //all files and folder in target path
  // const all = targetsrc(component, '*');

  // //some files or folder we need in target path
  // const need = targetsrc(component, 'index.css');

  let targetList = [];

  delList.forEach(src => {
    targetList = [...targetList, ...(glob.sync(path.resolve(
        './{lib,es}/packages',
        component,
        `style/${src}`
      ))
    )]
  });

  targetList.forEach(
    path => {
      //delete every component entry file first
      fs.remove(path, function (err) {
          if (err) console.log(err);
        }
      );
    });
};




