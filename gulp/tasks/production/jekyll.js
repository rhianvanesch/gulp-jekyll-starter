var gulp = require('gulp');
var cp = require('child_process');
var config = require('../../config').jekyll.production;
var jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll"; // windows bullshit


gulp.task('jekyll:production', function(done) {
  return cp.spawn(jekyll, ['build', '-q', '--source=' + config.src, '--destination=' + config.dest, '--config=' + config.config], { stdio: 'inherit' })
  .on('close', done);
});
