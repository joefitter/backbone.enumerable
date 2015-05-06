'use strict';

require('./helpers/setup');
require('../src/backbone.enumerable');

describe('Backbone.Enumerable', function() {

  var enumerable;

  describe('Initialisation', function() {

    beforeEach(function() {
      enumerable = new Backbone.Enumerable();
    });

    it('should have a length of 0', function() {
      expect(enumerable.length).to.be(0);
    });

    it('should have an items array', function() {
      expect(enumerable._items).to.be.an(Array);
    });

    it('should start on 0 index', function() {
      expect(enumerable._index).to.be(0);
    });

  });

  describe('Initialisation with items', function() {

    beforeEach(function() {
      var models = [
        new Backbone.Model(),
        new Backbone.Model(),
        new Backbone.Model()
      ];
      enumerable = new Backbone.Enumerable(models);
    });

    it('should have a length of 3', function() {
      expect(enumerable.length).to.be(3);
    });

    it('should have an items array', function() {
      expect(enumerable._items).to.be.an(Array);
    });

    it('should have 3 items', function() {
      expect(enumerable._items.length).to.be(3);
    });

    it('should start on 0 index', function() {
      expect(enumerable._index).to.be(0);
    });

  });

  describe('Methods', function() {

    var models = [
      new Backbone.Model(),
      new Backbone.Model(),
      new Backbone.Model()
    ];

    beforeEach(function() {
      enumerable = new Backbone.Enumerable(models);
    });

    describe('Public Methods', function() {

      describe('adding/removing', function() {

        beforeEach(function() {
          sinon.spy(Backbone.Enumerable.prototype, '_updateLength');
        });

        afterEach(function() {
          Backbone.Enumerable.prototype._updateLength.restore();
        });

        describe('add()', function() {

          var model;

          beforeEach(function() {
            model = new Backbone.Model();
          });

          it('should call _updateLength', function() {
            enumerable.add(model);
            expect(Backbone.Enumerable.prototype._updateLength.calledOnce).to.be(true);
          });

          it('should only accept items of the same type', function() {
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

          it('should update length if an item is added', function() {
            enumerable.add(model);
            expect(enumerable.length).to.be(4);
          });

          it('should be chainable', function() {
            enumerable.add(model).add(model);
            expect(enumerable.length).to.be(5);
          });
        });

        describe('remove()', function() {

          it('should call _updateLength', function() {
            enumerable.remove();
            expect(Backbone.Enumerable.prototype._updateLength.calledOnce).to.be(true);
          });

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

          it('should be chainable', function() {
            enumerable.remove().remove()
            expect(enumerable.length).to.be(1);
          });

        });

      });

      describe('get()', function() {

        it('should get an item at a given index', function() {
          expect(enumerable.get(1)).to.be(models[1]);
        });

        it('should return null if no index supplied', function() {
          expect(enumerable.get()).to.be(undefined);
        });

        it('should return null if an out of range index is supplied', function() {
          expect(enumerable.get(4)).to.be(undefined);
        });

      });

      describe('traversing', function() {

        beforeEach(function() {
          sinon.spy(Backbone.Enumerable.prototype, '_traverse');
        });

        afterEach(function() {
          Backbone.Enumerable.prototype._traverse.restore();
        });

        describe('next()', function() {

          it('should call _traverse()', function() {
            enumerable.next();
            expect(Backbone.Enumerable.prototype._traverse.called).to.be(true);
          });

          it('should pass 1 to _traverse()', function() {
            enumerable.next();
            expect(Backbone.Enumerable.prototype._traverse.calledWith(1)).to.be(true);
          });

          it('should increase the index by 1', function() {
            enumerable.next();
            expect(enumerable._index).to.be(1);
          });

          it('should reset index if reached end of items', function() {
            enumerable._index = 2;
            enumerable.next();
            expect(enumerable._index).to.be(0);
          });

          it('should be chainable', function() {
            enumerable.next().next();
            expect(enumerable._index).to.be(2);
          });

        });

        describe('prev()', function() {

          it('should call _traverse()', function() {
            enumerable.prev();
            expect(Backbone.Enumerable.prototype._traverse.called).to.be(true);
          });

          it('should pass -1 to _traverse()', function() {
            enumerable.prev();
            expect(Backbone.Enumerable.prototype._traverse.calledWith(-1)).to.be(true);
          });

          it('should decrease the index by 1', function() {
            enumerable._index = 2;
            enumerable.prev();
            expect(enumerable._index).to.be(1);
          });

          it('should set index to the last item if called when index is 0', function() {
            enumerable.prev();
            expect(enumerable._index).to.be(enumerable.length - 1);
          });

          it('should be chainable', function() {
            enumerable.prev().prev();
            expect(enumerable._index).to.be(1);
          });

        });

        describe('getNext()', function() {

          it('should call _traverse()', function() {
            enumerable.getNext();
            expect(Backbone.Enumerable.prototype._traverse.called).to.be(true);
          });

          it('should pass 1 to _traverse()', function() {
            enumerable.getNext();
            expect(Backbone.Enumerable.prototype._traverse.calledWith(1)).to.be(true);
          });

          it('should return the next item', function() {
            expect(enumerable.getNext()).to.be(models[1]);
          });

          it('should return the first item if index is last item', function() {
            enumerable._index = 2;
            expect(enumerable.getNext()).to.be(models[0]);
          });

        });

        describe('getPrev()', function() {

          it('should call _traverse()', function() {
            enumerable.getPrev();
            expect(Backbone.Enumerable.prototype._traverse.called).to.be(true);
          });

          it('should pass -1 to _traverse()', function() {
            enumerable.getPrev();
            expect(Backbone.Enumerable.prototype._traverse.calledWith(-1)).to.be(true);
          });

          it('should return the previous item', function() {
            enumerable._index = 2
            expect(enumerable.getPrev()).to.be(models[1]);
          });

          it('should return the last item if index is 0', function() {
            expect(enumerable.getPrev()).to.be(models[enumerable.length - 1]);
          });

        });

      });

      describe('getIndex()', function() {

        it('should return the index', function() {
          enumerable._index = 1;
          expect(enumerable.getIndex()).to.be(1);
        });

      });

      describe('setIndex()', function() {

        it('should set the index', function() {
          enumerable.setIndex(2);
          expect(enumerable._index).to.be(2);
        });

        it('should return false if index is out of range', function() {
          expect(enumerable.setIndex(6)).to.be(false);
        });

        it('should return the index if in range', function() {
          expect(enumerable.setIndex(1)).to.be(1);
        });

      });

    });

    describe('Private Methods', function() {

    });

    describe('Underscore Methods', function() {

      afterEach(function() {
        enumerable.invoke('reset');
      });

      it('should implement forEach', function() {
        enumerable.forEach(function(item, index) {
          item.index = index;
        });
        expect(enumerable._items[0].index).to.be(0);
        expect(enumerable._items[1].index).to.be(1);
        expect(enumerable._items[2].index).to.be(2);
      });

      it('should implement each', function() {
        enumerable.each(function(item, index) {
          item.index = index;
        });
        expect(enumerable._items[0].index).to.be(0);
        expect(enumerable._items[1].index).to.be(1);
        expect(enumerable._items[2].index).to.be(2);
      });

      it('should implement map', function() {
        var array = enumerable.map(function(item) {
          return item.cid;
        });
        expect(array).to.be.eql(['c1', 'c2', 'c3']);
      });

      it('should implement find', function() {
        var item = enumerable.find(function(item) {
          return item.cid === 'c1';
        });
        expect(item).to.be(models[0]);
      });

      it('should implement detect', function() {
        var item = enumerable.detect(function(item) {
          return item.cid === 'c1';
        });
        expect(item).to.be(models[0]);
      });

      it('should implement filter', function() {
        var filtered = enumerable.filter(function(item) {
          return item.cid === 'c1' || item.cid === 'c2';
        });
        expect(filtered).to.be.eql([models[0], models[1]]);
      });

      it('should implement select', function() {
        var filtered = enumerable.select(function(item) {
          return item.cid === 'c1' || item.cid === 'c2';
        });
        expect(filtered).to.be.eql([models[0], models[1]]);
      });

      it('should implement reject', function() {
        var filtered = enumerable.reject(function(item) {
          return item.cid === 'c1' || item.cid === 'c2';
        });
        expect(filtered).to.be.eql([models[2]]);
      });

      it('should implement every', function() {
        expect(enumerable.every(function(item) {
          return item instanceof Backbone.Model;
        })).to.be(true);
      });

      it('should implement all', function() {
        expect(enumerable.all(function(item) {
          return item instanceof Backbone.Model;
        })).to.be(true);
      });

      it('should implement some', function() {
        expect(enumerable.some(function(item) {
          return item.cid === 'c1';
        })).to.be(true);
      });

      it('should implement any', function() {
        expect(enumerable.any(function(item) {
          return item.cid === 'c1';
        })).to.be(true);
      });

      it('should implement includes', function() {
        expect(enumerable.includes(models[0])).to.be(true);
      });

      it('should implement contains', function() {
        expect(enumerable.contains(models[0])).to.be(true);
      });

      it('should implement invoke', function() {
        sinon.spy(Backbone.Model.prototype, 'isValid');
        enumerable.invoke('isValid');
        expect(Backbone.Model.prototype.isValid.callCount).to.be(3)
      });

      it('should implement toArray', function() {
        expect(enumerable.toArray()).to.be.eql(models);
      });

      it('should implement first', function() {
        expect(enumerable.first()).to.be(models[0]);
      });

      it('should implement initial', function() {
        expect(enumerable.initial()).to.be.eql([models[0], models[1]]);
      });

      it('should implement rest', function() {
        expect(enumerable.rest()).to.be.eql([models[1], models[2]]);
      });

      it('should implement last', function() {
        expect(enumerable.last()).to.be(models[2]);
      });

      it('should implement without', function() {
        expect(enumerable.without(models[1])).to.be.eql([models[0], models[2]]);
      });

      it('should implement isEmpty', function() {
        expect(enumerable.isEmpty()).to.be(false);
      });

      it('should implement pluck', function() {
        expect(enumerable.pluck('cid')).to.be.eql(['c1', 'c2', 'c3']);
      });

    });

  });

});
