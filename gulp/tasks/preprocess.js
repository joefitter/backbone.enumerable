'use strict';

var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var config = require('../config').preprocess;

gulp.task('preprocess', function() {
  return gulp.src(config.src)
    .pipe(preprocess(config.settings))
    .pipe(gulp.dest(config.dest));
});
