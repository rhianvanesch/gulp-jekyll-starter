var gulp = require('gulp');
var runSequence = require('run-sequence');

// Run all tasks needed for the build in order

gulp.task('build', ['jekyll'], function(callback) {

  runSequence('delete',   // delete assets folder
  [
    'jekyll',             // in parallel, create jekyll site
    'sass',               // css from sass files
    'scripts',            // concat js
    'images',           // copy images to assets folder
    'copy:fonts'
  ],
  callback);
});
