const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass');

const DIR = {
  sass: path.resolve(__dirname, '../../components/**/index.scss'),
  lib: path.resolve(__dirname, '../../lib'),
  es: path.resolve(__dirname, '../../es'),
};

sass.compiler = require('sass');
gulp.task('sass', () => {
  return gulp.src(DIR.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('default', gulp.series('sass'));
