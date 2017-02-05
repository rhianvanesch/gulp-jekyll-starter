var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var size = require('gulp-size');
var config = require('../../config').optimise.css;

gulp.task('optimise:css', function() {
  return gulp.src(config.src)
    .pipe(cssnano(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
