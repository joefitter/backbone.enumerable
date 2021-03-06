(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore'], function(Backbone, _) {
      return factory(Backbone, _);
    });
  } else if (typeof exports !== 'undefined') {
    var Backbone = require('backbone');
    var _  = require('underscore');
    module.exports = factory(Backbone, _);
  } else {
    factory(root.Backbone, root._);
  }

}(this, function(Backbone, _) {
  'use strict';

  var previousEnumerable = Backbone.Enumerable;

  // @include ../backbone.enumerable.js

  Backbone.Enumerable.VERSION = '<%= version %>';

  Backbone.Enumerable.noConflict = function() {
    Backbone.Enumerable = previousEnumerable;
    return this;
  };

  return Backbone.Enumerable;
}));
