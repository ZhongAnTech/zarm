import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import through2 from 'through2';
import { getProjectPath } from '../utils';

const cssInjection = (content) => {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.scss/g, '.css');
};

const gulpTask = (path?: string, outDir?: string, callback?: () => void) => {
  const DIR = {
    sass: getProjectPath(`${path}/**/index.scss`),
    js: getProjectPath(`${outDir}/**/style/index.js`),
  };

  gulp.task('sass', () => {
    sass.compiler = require('sass');
    return gulp
      .src(DIR.sass)
      .pipe(
        sass({
          includePaths: ['node_modules'],
        }).on('error', sass.logError),
      )
      .pipe(gulp.dest(outDir));
  });

  gulp.task('css', () => {
    return gulp
      .src(DIR.js)
      .pipe(
        through2.obj(function z(file, encoding, next) {
          this.push(file.clone());
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content));
          file.path = file.path.replace(/index\.js/, 'css.js');
          this.push(file);
          next();
        }),
      )
      .pipe(gulp.dest(outDir));
  });

  return gulp.series(['sass', 'css'], callback);
};

export default gulpTask;
