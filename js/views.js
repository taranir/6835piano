
var KeyboardView = Backbone.View.extend({
  el: $("keyboard"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render');

    this.collection = new Keyboard();
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


///////////////////////////////////////////



var HandsView = Backbone.View.extend({
  el: $("hands"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render');

    this.collection = new FingerPoints();
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



