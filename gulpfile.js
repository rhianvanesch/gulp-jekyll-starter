const gulp = require('gulp');
const browsersync = require('browser-sync');
const child = require('child_process');

const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

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

// Sass task: compile .scss files
gulp.task('sass', () => {
  // Location of source file. '.' is the project root
  return gulp.src('./_sass/main.scss') 
    // Initialise sourcemap generation:
    .pipe(sourcemaps.init())
    // compile Sass files
    .pipe(sass().on('error', sass.logError))
    // write sourcemaps into the /maps directory, inside gulp.dest
    .pipe(sourcemaps.write('./maps'))
    // Location of destination file(s). '.' is the project root
    .pipe(gulp.dest('./assets'))
})

// Watch our .scss files for changes; if they change run the 'sass' task
gulp.task('sass:watch', () => {
  gulp.watch('./_sass/**/*.scss', ['sass'])
})