var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../../config');

gulp.task('scripts', function() {
  return gulp.src(config.scripts.src)
    .pipe(sourcemaps.init())
      .pipe(concat('scripts.js'))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: config.scripts.dest }))
    .pipe(gulp.dest(config.scripts.dest));
});
