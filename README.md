# Installation

## Download and install these:
- [**Ruby**](https://www.ruby-lang.org/). I suggest using [RubyInstaller](http://rubyinstaller.org/) on Windows (make sure to check the option to add Ruby executables to your PATH). I'm using version 2.2.4.
- [**Node.js**](https://nodejs.org) (With the Windows installer, make sure you choose the option to add to PATH)
- [**LiveReload browser extension**](http://livereload.com/extensions/) for Chrome, Firefox and Safari

### Check everything's working:
Open a new command line window and enter the following:
```
ruby -v
node -v
npm -v
```
If Ruby, Node and the node package manager are installed correctly, you'll get version numbers for each.

## Open a command line and run these:
(on Windows, I highly recommend [ConEmu](https://conemu.github.io/) as a much-improved upgrade from the built-in cmd)

`gem install bundler` - installs [Bundler](http://bundler.io/), which lets you manage Ruby gems
`bundle install` - uses Bundler to quickly install all of the Ruby dependencies as defined in the Gemfile
`npm install gulp -g` - uses the node package manager to globally install gulp on your machine - a requirement for running gulp locally
`npm install` - uses the node package manager to install all of our gulp project dependencies, as defined in package.json

## Run the main gulp task

`gulp` is the default development task. It will do the following:
- delete the existing build/assets directory
- start watching files in jekyll and asset directories for changes
- start BrowserSync
- compile the jekyll site
- compile Sass into css and generate a sourcemap
- concatenate JavaScript files into scripts.js and generate a sourcemap
- copy the jekyll site and all assets into the `build/development` and `build/assets` directories (we take the assets out of the jekyll directory in development because jekyll deletes and rebuilds its containing directory on every site rebuild)

Now that it's watching your jekyll and asset directories, any change will automatically reload your browser window, which is ideal for efficient development.

## Publishing the site

`gulp publish` will get the site ready for deployment:
- compile jekyll site
- compile Sass into css, generate a sourcemap, minify and lint
- concatenate JavaScript files, generate a sourcemap, minify and lint
- optimise all images
- revision assets
- use an additional jekyll `_config.build.yml` file to overwrite any development settings from `_config.yml`, e.g. the `site.url` variable

You now have a ready-to-go site in `build/production`. Optionally, you can use the built-in rsync deployment at this time...

## Deployment with rsync

**Only tested on my environment - do a test upload first**

Create a `secrets.json` file in the `gulp` folder using this template:
```
{
  "rsync": { "dest": "user@domain.com:path/on/server" }
}
```
Fill in your ssh settings as appropriate, e.g. `me@awesome.com:public_html/blog`

Once you have run `gulp publish`, run `gulp deploy`. New files will automatically be uploaded and chmod settings set to 644 for files, 755 for folders.
