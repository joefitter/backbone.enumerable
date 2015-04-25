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

  it('should have a length of 3', function() {
    expect(enumerable.length).to.be(3);
  });

  it('should have a currentItem', function() {
    expect(enumerable._currentItem).to.be.ok();
  });

  it('should start on 0 index if items are passed', function() {
    expect(enumerable._currentIndex).to.be(0);
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
