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
    'mouseup': 'unhighlight',
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
    $(this.el).addClass("key");
    $(this.el).css("left", getBlackKeyPosition(this.model.get("typeNumber"), this.model.get("number"))+"px");
    return this;
  },
  highlight: function() {
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
  fingerViews: [],
  events: {

  },

  initialize: function() {
    _.bindAll(this, 'render', 'setFingers', 'addFinger'); //every function that uses "this" as the current object should be in here

    var fingers = [];
    _.each(_.range(NUM_FINGERS), function(num) {
      var finger = new Finger({id: num, type: 0});
      fingers.push(finger);
    });

    this.collection = new Hands(fingers);

    this.render();
  },

  render: function() {
    var self = this;
    _(this.collection.models).each(function(item) {
      self.addFinger(item);
    }, this);
  },

  addFinger: function(finger) {
    var fingerView = new FingerView({model: finger});
    this.fingerViews.push(fingerView);
    $(this.el).append(fingerView.render().el);
  },

  setFingers: function(fingers) {
    var fingerViews = this.fingerViews; // for scope of _.each loop
    var numShownFingers = fingers.length;
    var totalFingers = _.range(fingerViews.length);
    _.each(totalFingers, function(num) {
      var currentFinger = fingerViews[num];
      if (num < numShownFingers) {
        //calculate top and left from finger data
        var top = fingers[num].screenPosition()[2] + SCREENPOSITION_YOFFSET;
        var left = fingers[num].screenPosition()[0];
        currentFinger.setPosition(top, left);
        currentFinger.setType(fingers[num].type);
        currentFinger.show();
      }
      else {
        currentFinger.hide();
      }
    });
  }

});

var FingerView = Backbone.View.extend({
  className: "finger",
  events: {
    'tap': 'pressKey'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'hide', 'show', 'setPosition', 'setType');
    classString = "finger-" + this.model.get("type");
    $(this.el).addClass(classString);
    // this.render();
  },

  render: function() {
    return this;
  },

  //type indicates what kind of finger this is, 0-4
  setType: function(type) { 
    if (parseInt(type) != parseInt(this.model.get("type"))) {
      var classString = "finger-" + this.model.get("type");
      $(this.el).removeClass(classString);

      this.model.set("type", type);
      classString = "finger-" + this.model.get("type");
      $(this.el).addClass(classString);
    }

  },

  hide: function() {
    $(this.el).hide();
  },

  show: function() {
    $(this.el).show();
  },

  setPosition: function(top, left) {
    $(this.el).css("top", top);
    $(this.el).css("left", left);
  }
})

