var FingerPoint = Backbone.Model.extend({
  defaults: {

  },

  initialize: function() {

  }
});


var Key = Backbone.Model.extend({
  defaults: {

  }
});


var WhiteKey = Key.extend({

});

var BlackKey = Key.extend({

});
/////////////////////////////////////////////////////////////////////////////

var FingerPoints = Backbone.Collection.extend({
  model: FingerPoint
});

var Keyboard = Backbone.Collection.extend({
  model: Key
});