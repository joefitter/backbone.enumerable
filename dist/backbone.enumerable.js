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

  // Backbone.Enumerable
  
  Backbone.Enumerable = (function(Backbone, _) {
  
    var Enumerable = function(items) {
      this._items = [];
      this._currentItem = null;
      this._currentIndex = null;
      this._updateLength();
      _.each(items, this.add, this);
      this._setCurrentItem();
    };
  
    _.extend(Enumerable.prototype, {
  
      add: function(item, index) {
        if (index === undefined) {
          this._items.push(item);
        } else {
          this._items.splice(index, 0, item);
        }
        this._updateLength();
        return this;
      },
  
      remove: function(index) {
        if (index === undefined) {
          this._items.pop();
          this._updateLength();
          return this;
        }
        if (index > -1) {
          this._items.splice(index, 1);
        }
        this._updateLength();
        return this;
      },
  
      first: function() {
        return this._items.length ? this._items[0] : null;
      },
  
      last: function() {
        return this._items.length ? this._items[this._items.length - 1] : null;
      },
  
      get: function(index) {
        if (index === undefined) {
          return null;
        }
        return this._items[index] ? this._items[index] : null;
      },
  
      next: function() {
        this._traverse(1);
      },
  
      prev: function() {
        this._traverse(-1);
      },
  
      _traverse: function(change) {
        if (!this._currentItem) {
          return false;
        }
      },
  
      getCurrentItem: function() {
        return this._currentItem;
      },
  
      getCurrentIndex: function() {
        return this._currentIndex;
      },
  
      setCurrentItem: function(item) {
        if (item === undefined) {
          return false;
        }
        this._setCurrentItem(item);
      },
  
      _getCurrentItemIndex: function() {
        if (!this._currentItem) {
          return false;
        }
        return _.indexOf(this._items, this._currentItem);
      },
  
      _setCurrentItem: function(item) {
        if (item === undefined) {
          this._currentItem = this.first();
        } else if (this._getCurrentItemIndex() > -1) {
          this._currentItem = item;
        }
        this._setCurrentIndex();
        return this;
      },
  
      _setCurrentIndex: function() {
        this._currentIndex = this._getCurrentItemIndex();
      },
  
      _updateLength: function() {
        this.length = this._items.length;
      }
  
    });
  
    return Enumerable;
  })(Backbone, _);
  

  Backbone.Enumerable.VERSION = '0.0.0';

  Backbone.Enumerable.noConflict = function() {
    Backbone.Enumerable = previousEnumerable;
    return this;
  };

  return Backbone.Enumerable;
}));
