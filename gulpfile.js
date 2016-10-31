'use strict';

var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var npm = require('./package.json');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

// Web server.
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    https: false,
    port: 3000
  });
});

// App builder.
gulp.task('app', function () {
  if (argv.production) {
    process.env.NODE_ENV = 'production';
  }
  return browserify('./src/jsx/index.jsx')
    .transform('babelify', {presets: ['es2015', 'react']})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulpif(argv.production, buffer()))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest(npm.dest.js))
    .pipe(connect.reload());
});

// Sass.
gulp.task('sass', function () {
  return gulp.src(npm.paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-neat').includePaths,
      outputStyle: argv.production ? 'compressed' : 'expanded'
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulpif(!argv.production, sourcemaps.write('sourcemaps')))
    .pipe(gulp.dest(npm.dest.css))
    .pipe(gulpif(!argv.production, connect.reload()));
});

// JSX watch.
gulp.task('app:watch', ['app'], function () {
  gulp.watch(npm.paths.jsx, ['app']);
});

// Sass watch.
gulp.task('sass:watch', function () {
  gulp.watch(npm.paths.scss, ['sass']);
});

// Register workers.
gulp.task('default', ['sass', 'app', 'sass:watch', 'app:watch', 'connect']);
gulp.task('build', ['app', 'sass']);
