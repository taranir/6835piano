var Finger = Backbone.Model.extend({
  defaults: {
    currentID: false,
    currentKey: false,
    pressed: false,
    screenPosition: false,
    realPosition: false,
    palmPosition: false,
    velocity: false,
    palmVelocity: false,
    isPlaying: false
  },

  initialize: function() {

  }
});


var Key = Backbone.Model.extend({
  defaults: {
    number: "N/A", //from 0-87,
    typeNumber: "N/A", //index into whiteKeys, blackKeys; ie: this is the 5th white key
  },
  initialize: function() {

  }
});


var WhiteKey = Key.extend({
  defaults: {
    keytype: "white"
  }
/*
  allowedToEdit: function(account) {
    return account.owns(this);
  }
  // using super
  set: function(attributes, options) {
    Backbone.Model.prototype.set.apply(this, arguments);
    ...
  }
*/

});

var BlackKey = Key.extend({
  defaults: {
    keytype: "black"
  }
});
/////////////////////////////////////////////////////////////////////////////

var Hands = Backbone.Collection.extend({
  model: Finger
});

var Keyboard = Backbone.Collection.extend({
  model: Key
});