

var OptionsView = Backbone.View.extend({
  el: $('#options'),
  events: {
    'change input[type=radio]' : 'selectedMode',
    'click button[id=calibrate-button]' : 'setHandPosition',
    'click button[id=velocity-threshold-button]' : 'setVelocityThreshold'
  },
  initialize: function() {
    $(".mode-options").hide();
    $(".static-options").show();
  },

  selectedMode: function() {
    var value = $('input[name=mode]:checked').val();
    console.log(value);
    CURRENT_MODE = value;
    if (value == MODES.STATIC_THRESHOLD) {
      $(".mode-options").hide()
      $(".static-options").show();
    }
    else if (value == MODES.PALM_THRESHOLD) {
      $(".mode-options").hide()
      $(".palm-options").show();
    }
    else if (value == MODES.VELOCITY) {
      $(".mode-options").hide()
      $(".velocity-options").show();
    }
    else if (value == MODES.PALM_AND_VELOCITY) {
      $(".mode-options").hide()
      $(".palm-and-velocity-options").show();
    }
  },

  setHandPosition: function() {
    if (CURRENT_MODE == MODES.STATIC_THRESHOLD) {
      STATIC_THRESHOLD = CURRENT_HAND_POSITION - 5;
      var top = (STATIC_THRESHOLD / $(window).height()) * HOVER_BOX_HEIGHT;
      $("#threshold-height").text(STATIC_THRESHOLD);
      $("#threshold").css("top", top);
    }
    else if (CURRENT_MODE == MODES.PALM_THRESHOLD || CURRENT_MODE == MODES.PALM_AND_VELOCITY) {
      //average all finger heights
      if (currentFrame) {
        var averageFingerHeight = (_.reduce(currentFrame.fingers, function(sum, finger) {
          return sum + finger.stabilizedTipPosition[1];
        }, 0)) / currentFrame.fingers.length;
        console.log("average finger height: " + averageFingerHeight);
        var averagePalmHeight = (_.reduce(currentFrame.hands, function(sum, hand) {
          return sum + hand.palmPosition[1];
        }, 0)) / currentFrame.hands.length;
        console.log("average palm height: " + averagePalmHeight)
        var averageDistance = averagePalmHeight - averageFingerHeight;
        PALM_THRESHOLD = averageDistance + 20;
      }
     }
  },

  setVelocityThreshold: function() {
    if (CURRENT_MODE == MODES.VELOCITY || CURRENT_MODE == MODES.PALM_AND_VELOCITY) {
      VELOCITY_THRESHOLD = $("#velocity-threshold-value").val();
      console.log("set velocity threshold to " + VELOCITY_THRESHOLD);
    }
  }

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var HoverView = Backbone.View.extend({
  hoverFingerViews: [],
  initialize: function() {
    this.el = $("#hover-feedback");
    //every function that uses "this" as the current object should be in here
    _.bindAll(this, 'render', 'setFingers', 'addFinger'); 

    // var fingers = [];
    // _.each(_.range(NUM_FINGERS), function(num) {
    //   var finger = new HoverFinger({id: num, type: 0});
    //   fingers.push(finger);
    // });

    // this.collection = new Hands(fingers);

    this.render();
  },

  render: function() {
    var self = this;
    _.each(_.range(NUM_FINGERS), function(num) {
      self.addFinger();
    });
    // _(this.collection.models).each(function(item) {
    //   self.addFinger(item);
    // }, this);
  },

  addFinger: function(hoverFinger) {
    var hoverFingerView = new HoverFingerView();
    this.hoverFingerViews.push(hoverFingerView);
    $(this.el).append(hoverFingerView.render().el);
  },

  setFingers: function(fingers) {
    var hoverFingerViews = this.hoverFingerViews; // for scope of _.each loop
    var numShownFingers = fingers.length;
    var totalFingers = _.range(hoverFingerViews.length);
    _.each(totalFingers, function(num) {
      var currentFinger = hoverFingerViews[num];
      if (num < numShownFingers) {
        //calculate top and left from finger data
        var top = fingers[num].screenPosition()[1];
        var left = fingers[num].screenPosition()[0];
        currentFinger.setPosition(top, left);
        currentFinger.setType(fingers[num].type);
        currentFinger.show();
      }
      else {
        currentFinger.hide();
      }
    });
  },

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var HoverFingerView = Backbone.View.extend({
  className: "hover-finger",
  top: false,
  left: false,
  type: false,

  initialize: function() {
    _.bindAll(this, 'render', 'hide', 'show', 'setPosition', 'setType');
    // this.render();
  },

  render: function() {
    return this;
  },

  //type indicates what kind of finger this is, 0-4
  setType: function(type) { 
    if (type != this.type) {
      var classString = "finger-" + this.type;
      $(this.el).removeClass(classString);

      this.type = type;
      classString = "finger-" + this.type;
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
    this.top = (top / $(window).height()) * HOVER_BOX_HEIGHT;
    this.left = (left / $(window).width()) * HOVER_BOX_WIDTH;
    $(this.el).css("top", this.top);
    $(this.el).css("left", this.left);
  }

});