var gulp = require('gulp');
const fs = require('fs-extra');
var path = require('path');
var notify = require('gulp-notify');
var clean = require('gulp-clean');


var targetPath = path.join(__dirname, '../../lib');
var toPath = '../../../CX-WAP-Design/';
var fileName = 'cx-wap-ui';

gulp.task('clean-lib', function () {
  gulp.src(toPath + fileName, {read: false})
    .pipe(clean({force: true}))
    .pipe(notify({message: '===== clean lib complete ====='}));

});

// copy
gulp.task('copy-lib', function () {
  // copy
  fs.copySync(targetPath, toPath + fileName);

  // gulp.src(targetPath + '/**/*')
  //   .pipe(gulp.dest(toPath + fileName))
  //   .pipe(notify({message: '===== lib copy complete ====='}));
});


gulp.task('default', ['clean-lib', 'copy-lib']);
