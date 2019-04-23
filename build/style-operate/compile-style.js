const path = require('path');
const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpLess = require('gulp-less');
const csso = require('gulp-csso');
const postcss = require('gulp-postcss');
const minimist = require('minimist');

const options = minimist(process.argv.slice(2));


// compile component css
gulp.task('compile-less', () => (
  gulp
    .src(options.lesspath.split(','))
    .pipe(gulpLess({
      paths: [path.resolve(__dirname, 'node_modules')]
    }))
    .pipe(postcss())
    .pipe(csso())
    .pipe(gulp.dest(file => file.base.replace('.less', '.css')))
));

// compile component css
gulp.task('compile-scss', () => {
  gulp
    .src(options.scsspath.split(','))
    .pipe(gulpSass({
      paths: [path.resolve(__dirname, 'node_modules')]
    }))
    .pipe(postcss())
    .pipe(csso())
    .pipe(gulp.dest(file => file.base.replace('.scss', '.css')))
});

gulp.task('default', ['compile-scss', 'compile-less']);


