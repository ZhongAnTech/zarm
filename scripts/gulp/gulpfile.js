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

const DIR = {
  sass: path.resolve(__dirname, '../../components/**/*.scss'),
  buildSrc: path.resolve(__dirname, '../../components/**/index.scss'),
  lib: path.resolve(__dirname, '../../lib'),
  dist: path.resolve(__dirname, '../../dist'),
};

gulp.task('copySass', () => {
  return gulp.src(DIR.sass)
    .pipe(gulp.dest(DIR.lib));
});

gulp.task('dist', () => {
  return gulp.src(DIR.buildSrc)
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({ browsers }))
    .pipe(concat('zarm.css'))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))
    .pipe(sourcemaps.write())
    .pipe(rename('zarm.css.map'))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))

    .pipe(cssnano())
    .pipe(concat('zarm.min.css'))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist))
    .pipe(sourcemaps.write())
    .pipe(rename('zarm.min.css.map'))
    .pipe(size())
    .pipe(gulp.dest(DIR.dist));
});

gulp.task('default', ['copySass', 'dist']);
