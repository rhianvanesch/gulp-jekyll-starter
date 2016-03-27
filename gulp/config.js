var src               = 'app';
var build             = 'build';
var development       = 'build/development';
var production        = 'build/production';
var srcAssets         = 'app/_assets';
var developmentAssets = 'build/assets';
var productionAssets  = 'build/production/assets';

/*
Jekyll wipes out all files on every rebuild. Therefore, we generate the assets
outside of build/development so they aren't recreated every time.
*/

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      port: 9999,
      files: [
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/fonts/*'
      ]
    }
  },
  delete: {
    src: [developmentAssets]
  },
  jekyll: {
    development: {
      src: src,
      dest: development,
      config: '_config.yml'
    },
    production: {
      src: src,
      dest: production,
      config: '_config.yml,_config.build.yml'
    }
  },
  sass: {
    src: srcAssets + '/scss/**/*.{sass,scss}',
    dest: developmentAssets + '/css',
    options: {
      noCache: true,
      compass: false,
      bundleExec: true,
      sourcemap: true
    }
  },
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'safari 5',
      'ie 8',
      'ie 9',
      'opera 12.1',
      'ios 6',
      'android 4'
    ],
    cascade: true
  },
  scripts: {
    src: srcAssets + '/js/*.js',
    dest: developmentAssets + '/js'
  },
  images: {
    src: srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },
  copyfonts: {
    development: {
      src: srcAssets + '/fonts/*',
      dest: developmentAssets + '/fonts'
    },
    production: {
      src: developmentAssets + '/fonts/*',
      dest: productionAssets + '/fonts'
    }
  },
  watch: {
    jekyll: [
      '_config.yml',
      '_config.build.yml',
      src + '/_data/**/*.{json,yml,csv}',
      src + '/_includes/**/*.{html,xml}',
      src + '/_layouts/*.html',
      src + '/_plugins/*.rb',
      src + '/_posts/*.{markdown,md}',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      src + '/*'
    ],
    sass: srcAssets + '/scss/**/*.{sass,scss}',
    scripts: srcAssets + '/js/**/*.{sass,scss}',
    images: srcAssets + '/images/**/*'
  },
  scsslint: {
    src: [
      srcAssets + '/scss/**/*.{sass,scss}',
      '!' + srcAssets + '/scss/_syntax-highlighting.scss'
    ],
    options: {
      bundleExec: true
    }
  },
  jshint: {
    src: srcAssets + '/js/*.js'
  },
  optimise: {
    css: {
      src: developmentAssets + '/css/*.css',
      dest: productionAssets + '/css/',
      options: {
        discardComments: true,
        discardEmpty: true,
        mergeLonghand: true,
        safe: true
      }
    },
    js: {
      src: developmentAssets + '/js/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    images: {
      src: developmentAssets + '/images/**/*.{jpg,jpeg,png,gif}',
      dest: productionAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      }
    }
  },
  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js',
        productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },
  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}',
      '!' + production + '/feed.xml'
    ],
    dest: production
  },
  rsync: {
    src: production + '/**',
    options: '-rtvhcz --delete --progress --chmod=a=r,u+w,D+x -p'
  }
};
