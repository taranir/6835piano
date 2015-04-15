
var KeyboardView = Backbone.View.extend({
  el: $("#keyboard"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render', 'addKey'); //every function that uses "this" as the current object should be in here

    //create 88 new keys
    var keys = [];
    _.each(_.range(88), function(num) {
      keys.push(new Key({number: num}));
    });

    this.collection = new Keyboard(keys);
    this.render();
  },

  render: function() {
    var self = this;
    _(this.collection.models).each(function(key) {
      self.addKey(key);
    }, this);
  },

  addKey: function(key) {
    var keyView = new KeyView({
      model: key
    });
    $(this.el).append(keyView.render().el);
  }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var KeyView = Backbone.View.extend({
  className: "key",
  events: {
    'press': 'play'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    console.log("initializing key");
  },

  render: function() {
    return this;
  }
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var HandsView = Backbone.View.extend({
  el: $("#hands"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render'); //every function that uses "this" as the current object should be in here

    this.collection = new Hands();
    this.collection.bind('play', this.playNote);

    this.render();
  },

  render: function() {
    var self = this;
    _(this.collection.models).each(function(item) {
      self.appendItem(item);
    }, this);
  },


});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var FingerView = Backbone.View.extend({
  className: "finger",
  events: {
    'tap': 'pressKey'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    return this;
  },
})

