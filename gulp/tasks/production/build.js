var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:production', function(callback) {
  runSequence('delete', 'jekyll:production',
  [
    'sass',
    'scripts',
    'images',
    'copy:fonts'
  ],
  [
    'optimise:css',
    'optimise:js',
    'optimise:images',
    'copy:fonts:production'
  ],
  'revision',
  'rev:collect',
  callback);
});
