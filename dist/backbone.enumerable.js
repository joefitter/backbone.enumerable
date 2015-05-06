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
      this._index = null;
      this._type = null;
      this.length = 0;
      _.each(items, this.add, this);
    };
  
    _.extend(Enumerable.prototype, {
  
      /**
      *
      * Public Methods
      *
      **/
  
      add: function(item, index) {
        if (!this._items.length) {
          this._setType(item);
        }
        if (!(item instanceof this._type)) {
          throw new Error('Wrong type supplied.');
        }
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
  
      get: function(index) {
        if (index === undefined) {
          return null;
        }
        return this._items[index] || null;
      },
  
      next: function() {
        this._traverse(1);
      },
  
      prev: function() {
        this._traverse(-1);
      },
  
      getNext: function() {
        if (this._currentIndex === this.length - 1) {
          return this._items[0];
        }
        return this._items[this._currentIndex + 1]
      },
  
      getPrev: function() {
        if (this._currentIndex === 0) {
          return this._items[this.length - 1];
        }
        return this._items[this._currentIndex - 1];
      },
  
      getIndex: function() {
        return this._index;
      },
  
      setIndex: function(index) {
        if (index < 0 || index > this._items.length - 1) {
          return false;
        }
        this._index = index;
      },
  
      /**
  
      Private Methods
  
      **/
  
      _setType: function(item) {
        this._type = item.constructor;
        return this;
      },
  
      _traverse: function(change) {
        if (!this._index || this.length === 0) {
          return false;
        }
        var index = this._currentIndex + change;
        if (index === -1) {
          index = this.length - 1;
        }
        if (index === this.length) {
          index = 0;
        }
        this._setCurrentItem(this._items[index]);
      },
  
      _updateLength: function() {
        this.length = this._items.length;
      }
  
    });
  
    // Mix in methods from Underscore, for iteration, and other
    // collection related features.
    // Borrowing this code from Backbone.Collection:
    // http://backbonejs.org/docs/backbone.html#section-121
    var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
      'select', 'reject', 'every', 'all', 'some', 'any', 'include',
      'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
      'last', 'without', 'isEmpty', 'pluck'];
  
    _.each(methods, function(method) {
      Enumerable.prototype[method] = function() {
        var items = _.values(this._items);
        var args = [items].concat(_.toArray(arguments));
        return _[method].apply(_, args);
      };
    });
  
    return Enumerable;
  })(Backbone, _);
  

  Backbone.Enumerable.VERSION = '<%= version %>';

  Backbone.Enumerable.noConflict = function() {
    Backbone.Enumerable = previousEnumerable;
    return this;
  };

  return Backbone.Enumerable;
}));
