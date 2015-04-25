// Backbone.Enumerable

Backbone.Enumerable = (function(Backbone, _) {

  var Enumerable = function(items) {
    this._items = [];
    this._currentItem = null;
    this._currentIndex = null;
    this._type = null;
    this._updateLength();
    _.each(items, this.add, this);
    this._setCurrentItem();
  };

  _.extend(Enumerable.prototype, {

    /**

    Public Methods

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

    /**

    Private Methods

    **/

    _setType: function(item) {
      this._type = item.constructor;
      return this;
    },

    _traverse: function(change) {
      if (!this._currentItem) {
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
