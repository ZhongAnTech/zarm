const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const size = require('gulp-filesize');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const browsers = require('../config/browsers');

const CONFIG = {
  src: path.resolve(__dirname, '../../components/**/*.scss'),
  lib: path.resolve(__dirname, '../../lib'),
  dist: path.resolve(__dirname, '../../dist'),
  autoprefixer: { browsers },
};

gulp.task('copySass', () => {
  return gulp.src(CONFIG.src)
    .pipe(gulp.dest(CONFIG.lib));
});

gulp.task('dist', () => {
  return gulp.src(CONFIG.src)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer(CONFIG.autoprefixer))
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

gulp.task('default', ['copySass', 'dist']);
