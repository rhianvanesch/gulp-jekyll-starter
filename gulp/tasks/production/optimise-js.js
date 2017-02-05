var gulp = require('gulp');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var config = require('../../config').optimise.js;

gulp.task('optimise:js', function() {
  return gulp.src(config.src)
    .pipe(uglify(config.options))
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});
