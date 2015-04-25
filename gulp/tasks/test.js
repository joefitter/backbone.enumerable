'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var config = require('../config').test;

gulp.task('test', function() {
  return gulp.src(config.src, {read: false})
  .pipe(mocha({
    reporter: config.reporter,
    clearRequireCache: true
  }));
});
