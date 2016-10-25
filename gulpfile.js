const gulp = require('gulp');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');

// Sass.
gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths,
      outputStyle: 'expanded'
    }).on('error', notify.onError(function (error) {
      return 'SASS error: ' + error.message;
    })))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('sourcemaps'))
    .pipe(gulp.dest('public/css'));
});

// Sass watch.
gulp.task('sass:watch', function () {
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

// Register workers.
gulp.task('default', ['sass', 'sass:watch']);
