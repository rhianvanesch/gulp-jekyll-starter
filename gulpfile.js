const gulp = require('gulp');
const browsersync = require('browser-sync');
const child = require('child_process');

const jekyll = process.platform === "win32" ? "jekyll.bat" : "jekyll";

// The default task will run the jekyll build task and serve the site
gulp.task('default', ['jekyll', 'browsersync'])

// browserSync task: serve the site and watch for changes to files
gulp.task('browsersync', () => {
  browsersync({
    // Where to serve the files from (the build directory)
    server: {
      baseDir: '_site'
    },
    files: '_site/**', // watch the build directory for changes
    port: 4000 // optional, set it if you need a specific port
    })

  // Watch all these filetypes, and if they change, rebuild Jekyll
  gulp.watch('**/*.{html,markdown,md,yml,json,xml}', ['jekyll'])
})

// Jekyll task: build Jekyll
gulp.task('jekyll', (done) => {
  return child.spawn(jekyll, ['build',
    '--incremental',
    '--drafts'
  ])
  .on('close', done);
})
