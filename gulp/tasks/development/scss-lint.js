var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var config = require('../../config').scsslint;

gulp.task('scss-lint', function() {
  return gulp.src(config.src)
    .pipe(scsslint(config.options));
});
