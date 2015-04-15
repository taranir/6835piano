var FingerPoint = Backbone.Model.extend({
  defaults: {

  }
});


var Key = Backbone.Model.extend({
  defaults: {

  }
});

/////////////////////////////////////////////////////////////////////////////

var FingerPoints = Backbone.Collection.extend({
  model: FingerPoint
});

var Keyboard = Backbone.Collection.extend({
  model: Key
});