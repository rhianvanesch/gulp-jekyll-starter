var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var config = require('../../config').optimise.images;

gulp.task('optimise:images', function() {
  return gulp.src(config.src)
    .pipe(imagemin(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
