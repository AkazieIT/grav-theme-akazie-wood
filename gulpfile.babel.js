import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import cleanCSS from 'gulp-clean-css';
import header from 'gulp-header';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import del from 'del';
import strip from 'gulp-strip-comments';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';


const webpackOptions = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};

const pkg = require('./package.json');
const pkgName = pkg.name.toLowerCase();
const pkgNameJSCore = pkgName + '.core';
const pkgNameJSMain = pkgName + '.app';
const pkgNameJSMasonry = pkgName + '.masonry';

const dir = {
  src: './',
  build: 'build/',
};

const path = {
  src: {
    js: dir.src + 'js/',
    scss: dir.src + 'scss/',
    core: {
      js: dir.src + 'js/core/',
      scss: dir.src + 'scss/core/'
    },
    masonry: {
      js: dir.src + 'js/masonry/',
      scss: dir.src + 'scss/masonry/'
    },
    fonts: dir.src + dir.build + 'fonts/',
  },
  build: {
    js: dir.src + dir.build + 'js/',
    css: dir.src + dir.build + 'css/'
    }
};

const files = {
  watch: {
    scss: path.src.scss + '**/**/*.scss',
    js: [
        path.src.js + '**/*.js',
        path.src.js + '**/**/*.vue'
    ]
  },
  js: {
    main: [
      path.src.js + 'main.js',
    ],
    core: [
      path.src.core.js + 'jquery.min.js',
      path.src.core.js + 'bootstrap.bundle.min.js',
      path.src.core.js + 'lightgallery.js',
    ],
    masonry: [
      path.src.masonry.js + 'imagesloaded.pkgd.js',
      path.src.masonry.js + 'masonry.pkgd.js',
    ]
  },
  scss: {
    main: path.src.scss + 'main.scss'
  },
  css: {
    main: path.build.css + pkgName + '.css',
  },
  build: {
    js: path.build.js + 'all.min.js',
    css: path.build.css + 'all.min.css'
  }
};

const dependencies = {
  scss: {
    bootstrap: {
      base: path.src.core.scss + 'bootstrap/',
      src: 'node_modules/bootstrap/scss/**/*',
      dest: path.src.core.scss + 'bootstrap/'
    },
    fontawesome: {
      base: path.src.core.scss + 'fontawesome/',
      src: 'node_modules/@fortawesome/fontawesome-free/scss/**/*',
      dest: path.src.core.scss + 'fontawesome/'
    },
    lightgallery: {
      base: path.src.core.scss + 'lightgallery/',
      src: 'node_modules/lightgallery/src/sass/**/*',
      dest: path.src.core.scss + 'lightgallery/'
    }
  },
  fonts: {
    fontawesome: {
      base: path.src.fonts + 'fontawesome/',
      src: 'node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
      dest: path.src.fonts + 'fontawesome/'
    },
    lightgallery: {
      base: path.src.fonts + 'lightgallery/',
      src: 'node_modules/lightgallery/dist/fonts/*',
      dest: path.src.fonts + 'lightgallery/'
    }
  },
  js : {
    bootstrap: {
      base: path.src.core.js + 'bootstrap.bundle.min.js',
      src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      dest: path.src.core.js
    },
    jquery: {
      base: path.src.core.js + 'jquery.min.js',
      src: 'node_modules/jquery/dist/jquery.min.js',
      dest: path.src.core.js
    },
    lightgallery: {
      base: path.src.core.js + 'lightgallery.js',
      src: 'node_modules/lightgallery/dist/js/lightgallery.js',
      dest: path.src.core.js
    }
  }
};

const banner = ['/*!',
  ` * ${pkg.name} - v${pkg.version}`,
  ` * @author ${pkg.author}`,
  ` * Copyright (c) ${new Date().getFullYear()}`,
  ' */',
  ''].join('\n');

////////////////////////////////////////////////////////////////////////////////////////////////
//
// Clean Task
//
////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-clean', () => {
  return del(dir.build);
});

gulp.task('core-clean', () => {
  return del([path.src.core.js, path.src.core.scss]);
});
////////////////////////////////////////////////////////////////////////////////////////////////
//
// Kopiere Packete
//
////////////////////////////////////////////////////////////////////////////////////////////////

function depUpdate(depName, depData) {
  del(depData.base).then(() => {
    if (depData.min) {
      return gulp.src(depData.src)
        .pipe(uglify({output: {comments: '/^!/'}}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(depData.dest));
    } else if (depData.minclean) {
      return gulp.src(depData.src)
        .pipe(strip({safe: true}))
        .pipe(gulp.dest(depData.dest));
    } else {
      return gulp.src(depData.src)
        .pipe(gulp.dest(depData.dest));
    }
  });
}

gulp.task('dep-fonts', (done) => {
  for (const [key, value] of Object.entries(dependencies.fonts)) {
    depUpdate(key, value);
  }

  done();
});

gulp.task('dep-scss', (done) => {
  for (const [key, value] of Object.entries(dependencies.scss)) {
    depUpdate(key, value);
  }

  done();
});

gulp.task('dep-js', (done) => {
  for (const [key, value] of Object.entries(dependencies.js)) {
    depUpdate(key, value);
  }

  done();
});



////////////////////////////////////////////////////////////////////////////////////////////////
//
// Gulp Task
//
////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('dep-update', gulp.series('core-clean', 'dep-scss', 'dep-js', 'dep-fonts'));


////////////////////////////////////////////////////////////////////////////////////////////////
//
// SASS and CSS Tasks
//
////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('css-scss-main', () => {
  return gulp.src(files.scss.main)
    .pipe(sass({outputStyle: 'expanded', precision: 6}).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(header(banner, {pkg : pkg} ))
    .pipe(rename({basename: pkgName}))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('css-min-main', () => {
  return gulp.src(files.css.main)
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(path.build.css));
});

////////////////////////////////////////////////////////////////////////////////////////////////
//
// JS Tasks
//
////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('js-core', () => {
  return gulp.src(files.js.core)
    .pipe(concat(pkgNameJSCore + '.min.js'))
    .pipe(uglify())
    .pipe(header(banner, {pkg : pkg} ))
    .pipe(gulp.dest(path.build.js));
});

gulp.task('js-main', () => {
  return gulp.src(files.js.main)
    .pipe(named())
    .pipe(gulpWebpack(webpackOptions, webpack))
    .pipe(header(banner, {pkg : pkg} ))
    .pipe(rename({basename: pkgNameJSMain, suffix: '.min'}))
    .pipe(gulp.dest(path.build.js));
});
gulp.task('js-masonry', () => {
  return gulp.src(files.js.masonry)
    .pipe(concat(pkgNameJSMasonry + '.min.js'))
    .pipe(uglify())
    .pipe(header(banner, {pkg : pkg} ))
    .pipe(gulp.dest(path.build.js));
});

////////////////////////////////////////////////////////////////////////////////////////////////
//
// Haupt Tasks
//
////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('css', gulp.series(
  gulp.series('css-scss-main'),
  gulp.series('css-min-main')
));

gulp.task('js', gulp.series(
  gulp.series('js-core'),
  gulp.series('js-main'),
  gulp.series('js-masonry')
));

gulp.task('build', gulp.series('css', 'js'));

////////////////////////////////////////////////////////////////////////////////////////////////
//
// Beobachtungs Tasks
//
////////////////////////////////////////////////////////////////////////////////////////////////

// Watch task for SASS files
gulp.task('watch-scss', () => {
  return gulp.watch(files.watch.scss, gulp.series('css'));
});

gulp.task('watch-js', () => {
  return gulp.watch(files.watch.js, gulp.series('js-main'));
});

gulp.task('watch', gulp.parallel('watch-scss', 'watch-js'));
