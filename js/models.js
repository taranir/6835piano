var Finger = Backbone.Model.extend({
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

/*
  allowedToEdit: function(account) {
    return account.owns(this);
  }
*/

});

var BlackKey = Key.extend({

});
/////////////////////////////////////////////////////////////////////////////

var Hands = Backbone.Collection.extend({
  model: Finger
});

var Keyboard = Backbone.Collection.extend({
  model: Key
});