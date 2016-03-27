var gulp = require('gulp');
var del = require('del');
var config = require('../../config').delete;

// Delete everything in build/assets

gulp.task('delete', function(callback) {
  del(config.src, callback);
});
