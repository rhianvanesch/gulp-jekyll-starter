var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var browsersync  = require('browser-sync');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var config       = require('../../config').sass;

// Generate CSS from SCSS and build sourcemaps

gulp.task('sass', function() {
  config.options.onError = browsersync.notify;
  browsersync.notify('Compiling Sass');

  return sass(config.src, config.options)
    .pipe(plumber()) // keeps gulp running if there's a syntax error in a file
    .pipe(sourcemaps.init())
      .pipe(autoprefixer(config.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest));
});
