var whiteKeyboard;
var blackKeyboard;
var KeyboardView = Backbone.View.extend({
  events: {
  },

  initialize: function() {
    this.el = $("#keyboard");
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
    'mousedown': 'press',
    'mouseup': 'release',
  },

  initialize: function() {
    _.bindAll(this, 'render', 'press', 'release');
  },

  render: function() {
    this.el.id = 'key-' + this.model.get('number');
    return this;
  },

  press: function(e, volume) {
    //defined in subclass
  },

  release: function() {
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
  press: function(e, volume) {
    playNote(this.model.get("number"), volume);
    $(this.el).addClass("highlighted-white-key");
  },
  release: function() {
    stopNote(this.model.get("number"));
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
  press: function(e, volume) {
    playNote(this.model.get("number"), volume);
    $(this.el).addClass("highlighted-black-key");
  },
  release: function() {
    stopNote(this.model.get("number"));
    $(this.el).removeClass("highlighted-black-key");
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var HandsView = Backbone.View.extend({
  fingerViews: [],
  // events: {
  //   "keyTapStart": "keyTapStart",
  //   "keyTapEnd": "keyTapEnd"
  // },

  initialize: function() {
    this.el = $("#hands");
    //every function that uses "this" as the current object should be in here
    _.bindAll(this, 'render', 'setFingers', 'addFinger', 'processFingers'); 

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
        currentFinger.setCurrentID(fingers[num].id);
        currentFinger.show();
      }
      else {
        currentFinger.hide();
      }
    });
  },

  processFingers: function(fingers) {
    var fingersDownList = []; //list of finger IDs
    var fingersUpList = []
    var newFingerVelocities = {};
    _.each(fingers, function(finger) {
      var fingerID = finger.id;
      newFingerVelocities[fingerID] = finger.tipVelocity[1];
      //console.log(fingerHeight);

      /////////////////////////////////////////////////////////////////////////
      if (CURRENT_MODE == MODES.STATIC_THRESHOLD) {
        var fingerHeight = finger.screenPosition()[1];
        if (fingerHeight > STATIC_THRESHOLD) {
          fingersDownList.push(fingerID);
        }
        else {
          fingersUpList.push(fingerID);
        }
      }
      /////////////////////////////////////////////////////////////////////////
      else if (CURRENT_MODE == MODES.PALM_THRESHOLD) {
        var palmHeight = finger.hand().palmPosition[1]; //in mm above controller
        var fingerHeight = finger.stabilizedTipPosition[1];
        //console.log("palmHeight: " + palmHeight + ", fingerHeight: " + fingerHeight);
        if (palmHeight - fingerHeight > PALM_THRESHOLD) {
          fingersDownList.push(fingerID);
        }
        else {
          fingersUpList.push(fingerID);
        }
      }
      /////////////////////////////////////////////////////////////////////////
      else if (CURRENT_MODE == MODES.VELOCITY) {
        var fingerVelocity = finger.tipVelocity[1];
        var palmVelocity = finger.hand().palmVelocity[1];
        console.log("finger: " + fingerVelocity + ", palm: " + palmVelocity + ", finger-palm: " + Math.abs(fingerVelocity-palmVelocity));
        if (Math.abs(fingerVelocity - palmVelocity) > VELOCITY_THRESHOLD && fingerVelocity < 0) {
          fingersDownList.push(fingerID);
        }
        else {
          fingersUpList.push(fingerID);
        }

      }
      /////////////////////////////////////////////////////////////////////////
      else if (CURRENT_MODE == MODES.PALM_AND_VELOCITY) {

      }
    });
    Backbone.trigger("fingersDown", fingersDownList);
    Backbone.trigger("fingersUp", fingersUpList);
    fingerVelocities = newFingerVelocities;
  },


});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var FingerView = Backbone.View.extend({
  className: "finger",
  top: false,
  left: false,

  // events: {
  //   'keyTapStart': 'pressKey',
  //   'keyTapEnd': 'releaseKey'
  // },

  initialize: function() {
    _.bindAll(this, 'render', 'hide', 'show', 'setPosition', 'setType', 'setCurrentID', 'pressKey', 'releaseKey',
      'fingerDown', 'fingerUp');

    this.listenTo(Backbone, "fingersDown", this.fingerDown);
    this.listenTo(Backbone, "fingersUp", this.fingerUp);

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

  setCurrentID: function(id) {
    this.model.set("currentID", id);
  },

  hide: function() {
    $(this.el).hide();
  },

  show: function() {
    $(this.el).show();
  },

  setPosition: function(top, left) {
    this.top = top;
    this.left = left;
    $(this.el).css("top", top);
    var scrollOffset = $("#content").scrollLeft();
    $(this.el).css("left", left + scrollOffset);
  },

  fingerDown: function(fingerIDs) {
    if (_.indexOf(fingerIDs, this.model.get("currentID")) > -1) {
      if (!this.model.get("pressed")) {
        this.pressKey();
        this.model.set("pressed", true);
      }
    }
  },

  fingerUp: function(fingerIDs) {
    if (_.indexOf(fingerIDs, this.model.get("currentID")) > -1) {
      if (this.model.get("pressed")) {
        this.model.set("pressed", false);
        this.releaseKey();
      }
    }
  },

  pressKey: function() {
    if (this.top && this.left) {
      //get the element this finger is hovering over
      var offset = $("#content").offset();
      var key = document.elementFromPoint(this.left + offset.left, (this.top + offset.top - SCREENPOSITION_YOFFSET));
      this.model.set("currentKey", key);
      if (key) {
        var id = this.model.get("currentID");
        var volume = convertVelocityToVolume(fingerVelocities.id);
        $(key).trigger("mousedown", volume);
      }
    }    
  },

  releaseKey: function() {
    var key = this.model.get("currentKey");
    if (key) {
      $(key).trigger("mouseup");
      this.model.set("currentKey", false);
    }
  }
})
