var gulp = require('gulp');
var config = require('../../config').copyfonts.production;

gulp.task('copy:fonts:production', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});
