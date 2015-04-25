'use strict';

var gulp = require('gulp');

gulp.task('default', ['lint', 'test', 'preprocess', 'template', 'uglify']);
