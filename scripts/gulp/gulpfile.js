const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const size = require('gulp-filesize');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

const CONFIG = {
  src: path.resolve(__dirname, '../../components/**/style/*.scss'),
  lib: path.resolve(__dirname, '../../lib'),
  dist: path.resolve(__dirname, '../../dist'),
  autoprefixer: {
    browsers: [
      'last 3 versions',
      'ie >= 10',
      'ie_mob >= 10',
      'ff >= 30',
      'chrome >= 34',
      'safari >= 6',
      'opera >= 12.1',
      'ios >= 6',
      'android >= 4.4',
      'bb >= 10',
      'and_uc 9.9',
    ],
  },
};

gulp.task('default', () => {
  return gulp.src(CONFIG.src)
    .pipe(gulp.dest(CONFIG.lib))

    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer(CONFIG.autoprefixer))
    .pipe(size())
    .pipe(gulp.dest(CONFIG.lib))

    .pipe(concat('zarm.css'))
    .pipe(size())
    .pipe(gulp.dest(CONFIG.dist))
    .pipe(sourcemaps.write())
    .pipe(rename('zarm.css.map'))
    .pipe(size())
    .pipe(gulp.dest(CONFIG.dist))

    .pipe(cssnano())
    .pipe(concat('zarm.min.css'))
    .pipe(size())
    .pipe(gulp.dest(CONFIG.dist))
    .pipe(sourcemaps.write())
    .pipe(rename('zarm.min.css.map'))
    .pipe(size())
    .pipe(gulp.dest(CONFIG.dist));
});
