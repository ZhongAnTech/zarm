const path = require('path');
const gulp = require('gulp');

const DIR = {
  sass: path.resolve(__dirname, '../../components/**/*.scss'),
  lib: path.resolve(__dirname, '../../lib'),
  es: path.resolve(__dirname, '../../es'),
};

gulp.task('copySass', () => {
  return gulp.src(DIR.sass)
    .pipe(gulp.dest(DIR.lib))
    .pipe(gulp.dest(DIR.es));
});

gulp.task('default', ['copySass']);
