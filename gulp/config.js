'use strict';

var version = require('../package.json').version;
var src = './src/';
var dest = './dist/';

module.exports = {
  preprocess: {
    src: src + 'build/backbone.enumerable.js',
    dest: dest
  },
  template: {
    src: dest + 'backbone.enumerable.js',
    dest: dest,
    data: {
      version: version
    }
  },
  uglify: {
    src: dest + 'backbone.enumerable.js',
    dest: dest,
    rename: {
      extname: '.min.js'
    }
  },
  lint: {
    src: src + '**/*.js'
  },
  test: {
    src: './spec/**/*-spec.js',
    reporter: 'nyan'
  }
};
