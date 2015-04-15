
var whiteKeyboard;
var blackKeyboard;
var KeyboardView = Backbone.View.extend({
  el: $("#keyboard"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render', 'addKey'); //every function that uses "this" as the current object should be in here

    //create 88 new keys
    var keys = [];
    var whiteKeys = [];
    var blackKeys = [];
    var whiteKeyCount = 0;
    var blackKeyCount = 0;
    _.each(_.range(88), function(num) {
      if (isBlack(num)) {
        var key = new BlackKey({number: num, typeNumber: blackKeyCount});
        keys.push(key);
        blackKeys.push(key);
        blackKeyCount += 1;
      }
      else {
        var key = new WhiteKey({number: num, typeNumber: whiteKeyCount});
        keys.push(key);
        whiteKeys.push(key);
        whiteKeyCount += 1;
      }
    });

    this.collection = new Keyboard(keys);
    whiteKeyboard = new Keyboard(whiteKeys);
    blackKeyboard = new Keyboard(blackKeys);
    this.render();
  },

  render: function() {
    var self = this;
    _(this.collection.models).each(function(key) {
      self.addKey(key);
    }, this);
  },

  addKey: function(key) {
    if (key.get("keytype") == "white") {
      var keyView = new WhiteKeyView({
        model: key
      });
    }
    else {
      var keyView = new BlackKeyView({
        model: key
      });
    }

    $(this.el).append(keyView.render().el);
  }

});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var KeyView = Backbone.View.extend({
  className: "key",
  events: {
    'mousedown': 'highlight',
    'mouseup': 'unhighlight'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'highlight');
  },

  render: function() {
    this.el.id = 'key-' + this.model.get('number');
    return this;
  },

  highlight: function() {
    //defined in subclass
  },

  unhighlight: function() {
    //defined in subclass
  }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var WhiteKeyView = KeyView.extend({
  className: 'white-key',
  render: function() {
    console.log("rendering key " + this.model.get("number"));
    $(this.el).addClass("key");
    $(this.el).css("left", parseInt(this.model.get("typeNumber"))*WHITE_KEY_WIDTH+"px");
    return this;
  },
  highlight: function() {
    $(this.el).addClass("highlighted-white-key");
  },
  unhighlight: function() {
    $(this.el).removeClass("highlighted-white-key");
  }
});

var BlackKeyView = KeyView.extend({
  className: 'black-key',
  render: function() {
    console.log("rendering key " + this.model.get("number"));
    $(this.el).addClass("key");
    $(this.el).css("left", getBlackKeyPosition(this.model.get("typeNumber"), this.model.get("number"))+"px");
    return this;
  },
  highlight: function() {
    console.log("highlight");
    $(this.el).addClass("highlighted-black-key");
  },
  unhighlight: function() {
    $(this.el).removeClass("highlighted-black-key");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var HandsView = Backbone.View.extend({
  el: $("#hands"),

  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render', 'setFingers'); //every function that uses "this" as the current object should be in here

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

  setFingers: function() {

  }

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

