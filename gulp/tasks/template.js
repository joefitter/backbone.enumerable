'use strict';

var gulp = require('gulp');
var template = require('gulp-template');
var config = require('../config').template;

gulp.task('template', ['preprocess'], function() {
  return gulp.src(config.src)
    .pipe(template(config.data))
    .pipe(gulp.dest(config.dest));
});
