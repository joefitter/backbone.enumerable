// Backbone.Enumerable

Backbone.Enumerable = (function(Backbone, _) {

  var Enumerable = function(items) {
    if (items) {
      items = _.isArray(items) ? items : [items];
    }
    this._items = [];
    this._index = 0;
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
        return undefined;
      }
      return this._items[index] || undefined;
    },

    next: function() {
      this._traverse(1);
      return this;
    },

    prev: function() {
      this._traverse(-1);
      return this;
    },

    getNext: function() {
      this.next();
      return this.get(this._index);
    },

    getPrev: function() {
      this.prev();
      return this.get(this._index);
    },

    getIndex: function() {
      return this._index;
    },

    setIndex: function(index) {
      if (index < 0 || index > this._items.length - 1) {
        return false;
      }
      this._index = index;
      return this._index;
    },

    /**
    *
    * Private Methods
    *
    **/

    _setType: function(item) {
      this._type = item.constructor;
      return this;
    },

    _traverse: function(change) {
      if (this.length === 0) {
        return false;
      }
      var index = this._index + change;
      if (index === -1) {
        index = this.length - 1;
      }
      if (index === this.length) {
        index = 0;
      }
      return this.setIndex(index);
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
    'select', 'reject', 'every', 'all', 'some', 'any', 'includes',
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
