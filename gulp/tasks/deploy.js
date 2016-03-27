var gulp = require('gulp');
var rsync = require('rsync-slim');
var config = require('../config').rsync;
var secrets = require('../secrets').rsync;


gulp.task('deploy', function() {
  rsync({src: config.src, dest: secrets.dest, options: config.options});
});
