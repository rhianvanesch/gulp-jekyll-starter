# gulp-jekyll-starter

A starter project which integrates gulp automation with the jekyll static site generator.

## Features
- Generates Jekyll site
- Reloads the browser on any changes
- Generates CSS from Sass files, with sourcemaps and linting
- Concatenates JavaScript files, with sourcemaps and linting
- Includes a simple image tag plugin for ease of use
- Optimises and revisions CSS, JS and image files for production
- Optional deployment with rsync

### Credits

- Thanks to [Stefan Imhoff](http://stefanimhoff.de/) for his great [Introduction to Gulp.js tutorial series](http://stefanimhoff.de/2014/gulp-tutorial-1-intro-setup/), much of which I've used here.
- [Octopress Image Tag plugin](https://github.com/octopress/image-tag) by the fine people at Octopress

# Installation

## 1. Install these:
- [Ruby](https://www.ruby-lang.org/). Tested with version 2.2.4. I suggest using [RubyInstaller](http://rubyinstaller.org/) on Windows (make sure to check the option to add Ruby executables to your PATH).
- [Node.js](https://nodejs.org) Tested with version 0.12.5. On Windows, make sure you choose the option to add to PATH.
- [LiveReload browser extension](http://livereload.com/extensions/) for Chrome, Firefox and Safari

### Check everything's working:
Open a new command line window and enter the following:
```
ruby -v
node -v
npm -v
```
If Ruby, Node and the node package manager are installed correctly, you'll get version numbers for each.

## 2. Open a command line and run these:
On Windows, do this as an administrator. I also recommend [ConEmu](https://conemu.github.io/) as a much-improved upgrade from the built-in cmd.

- `gem install bundler` - installs [Bundler](http://bundler.io/), which lets you manage Ruby gems
- `bundle install` - uses Bundler to quickly install all of the Ruby dependencies as defined in the Gemfile
- `npm install gulp -g` - uses the node package manager to globally install gulp on your machine - a requirement for running gulp locally
- `npm install` - uses the node package manager to install all of our gulp project dependencies, as defined in package.json

## 3. Run the main gulp task

`gulp` is the default development task. It will do the following:
- delete the existing build/assets directory
- start watching files in jekyll and asset directories for changes
- start BrowserSync
- compile the jekyll site
- compile Sass into css and generate a sourcemap
- concatenate JavaScript files into scripts.js and generate a sourcemap
- copy the jekyll site and all assets into the `build/development` and `build/assets` directories (we take the assets out of the jekyll directory in development because jekyll deletes and rebuilds its containing directory on every site rebuild - a frequent occurrence in the development phase)

Now that it's watching your jekyll and asset directories, any changes will automatically reload your browser window, which is ideal for efficient development.

## 4. Publishing the site

`gulp publish` will get the site ready for deployment:
- compile jekyll site
- compile Sass into css and minify
- concatenate JavaScript files and minify
- optimise all images
- revision assets
- use an additional jekyll `_config.build.yml` file to overwrite any development settings from `_config.yml`, e.g. the `site.url` variable

You now have a ready-to-go site in `build/production`. Optionally, you can use the built-in rsync deployment at this time...

## 5. Deployment with rsync

**Only tested on my environment - do a test upload first**

Customise the `secrets.json` file in the `gulp` folder, filling in your ssh settings as appropriate, e.g. `me@awesome.com:public_html/blog`

Once you have run `gulp publish`, run `gulp deploy`. New files will automatically be uploaded and chmod settings set to 644 for files, 755 for folders.

If you're going to share your project, make sure you add `gulp/secrets.json` to the `.gitignore` file.
