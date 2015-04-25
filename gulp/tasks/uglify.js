'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var config = require('../config').uglify;

gulp.task('uglify', ['template'], function() {
  return gulp.src(config.src)
    .pipe(uglify())
    .pipe(rename(config.rename))
    .pipe(gulp.dest(config.dest));
});
