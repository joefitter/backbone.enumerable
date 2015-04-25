'use strict';

require('./helpers/setup');
require('../src/backbone.enumerable');

describe('Backbone.Enumerable', function() {
  var enumerable;

  beforeEach(function() {
    var models = [
      new Backbone.Model(),
      new Backbone.Model(),
      new Backbone.Model()
    ];
    enumerable = new Backbone.Enumerable(models);
  });

  describe('Initialisation', function() {
    it('should have a length of 3', function() {
      expect(enumerable.length).to.be(3);
    });

    it('should have a currentItem', function() {
      expect(enumerable._currentItem).to.be.ok();
    });

    it('should start on 0 index if items are passed', function() {
      expect(enumerable._currentIndex).to.be(0);
    });
  });

  describe('Public Methods', function() {

    describe('add()', function() {
      var model;

      beforeEach(function() {
        model = new Backbone.Model();
      });

      it('should throw an error if the wrong type is added', function() {
        var collection = new Backbone.Collection();
        expect(function() {
          enumerable.add(collection);
        }).to.throwException(/Wrong type supplied/);
      });

      it('should add an item to the end of the enumerable if no index is supplied', function() {
        enumerable.add(model);
        expect(enumerable._items[enumerable._items.length - 1]).to.be(model);
      });

      it('should add an item at a specific index', function() {
        enumerable.add(model, 0);
        expect(enumerable._items[0]).to.be(model);
      });
    });

    describe('remove()', function() {

      it('should remove the last item if called with no arguments', function() {
        var last = enumerable._items[enumerable._items.length - 1];
        enumerable.remove();
        expect(enumerable._items.indexOf(last)).to.be(-1);
      });

      it('should remove an item at a specific index if an index is passed', function() {
        var index = 1;
        var item = enumerable._items[index];
        enumerable.remove(index);
        expect(enumerable._items.indexOf(item)).to.be(-1);
      });

      it('should update the length on removing an item', function() {
        enumerable.remove();
        expect(enumerable.length).to.be(2);
      });

    });

  });

  it('its length should increase if a new item is added', function() {
    enumerable.add(new Backbone.Model());
    expect(enumerable.length).to.be(4);
  });

  it('its length should decrease if remove is called', function() {
    enumerable.remove();
    expect(enumerable.length).to.be(2);
  });
});
