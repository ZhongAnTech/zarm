const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');
const through2 = require('through2');

const DIR = {
  sass: path.resolve(__dirname, '../../components/**/index.scss'),
  js: path.resolve(__dirname, '../../lib/**/style/index.js'),
  lib: path.resolve(__dirname, '../../lib'),
  es: path.resolve(__dirname, '../../es'),
};

const cssInjection = (content) => {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.scss/g, '.css');
};

gulp.task('sass', () => {
  sass.compiler = require('sass');
  return gulp.src(DIR.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('css', () => {
  return gulp.src(DIR.js)
    .pipe(through2.obj(function z(file, encoding, next) {
      this.push(file.clone());
      const content = file.contents.toString(encoding);
      file.contents = Buffer.from(cssInjection(content));
      file.path = file.path.replace(/index\.js/, 'css.js');
      this.push(file);
      next();
    }))
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('default', gulp.series(['sass', 'css']));
