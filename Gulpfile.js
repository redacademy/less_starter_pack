'use strict';

const Gulp = require('gulp');
const HtmlMin = require('gulp-htmlmin');
const Less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const BrowserSync = require('browser-sync').create();

const autoprefix = new LessAutoprefix({ browsers: ['last 3 versions'] });


/**
 * Minify HTML
 */
Gulp.task('html', () => {
  return Gulp.src('./src/*.html')
    .pipe(HtmlMin({
      collapseWhitespace: true
    }))
    .pipe(Gulp.dest('./dist'))
    .pipe(BrowserSync.stream());
});


/**
 * Server with hot reloading
 */
Gulp.task('browser-sync', () => {
  BrowserSync.init({
    server: {
      baseDir: './dist'
    }
  });

  Gulp.watch('./src/images/*.{svg,png}', ['copy-images']);
  Gulp.watch('./src/*.html', ['html']);
  Gulp.watch('./src/less/*.less', ['less']);
});


/**
 * CSS preprocessing with Less
 */
Gulp.task('less', () => {
  return Gulp.src('./src/less/style.less')
    .pipe(Less({
      plugins: [autoprefix]
    }))
    .pipe(Gulp.dest('./dist'))
    .pipe(BrowserSync.stream());
});


/**
 * Copy images over
 */
Gulp.task('copy-images', () => {
  return Gulp.src('./src/images/*.{svg,png}')
    .pipe(Gulp.dest('./dist/images'))
    .pipe(BrowserSync.stream());
});


Gulp.task('default', [
  'copy-images',
  'html',
  'less',
  'browser-sync'
]);
