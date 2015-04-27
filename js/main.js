var keyboardView = new KeyboardView();
var handsView = new HandsView();
var hoverView = new HoverView();
var optionsView = new OptionsView();
var prevGestures = false; //list of IDs of prev gestures
// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {

  if (frame.valid) {
    var sortedFingers = frame.fingers.sort(function(a, b) {
      return a.id - b.id;
    });
    if (frame.hands.length > 0) {
      $("#current-hand-height").text(frame.hands[0].screenPosition()[1]);
      CURRENT_HAND_POSITION = frame.hands[0].screenPosition()[1];
    }
    
    handsView.setFingers(sortedFingers);
    hoverView.setFingers(sortedFingers);

    handsView.processFingers(sortedFingers);
    

    // //filter out only keyTap gestures
    // var gestures = _.filter(frame.gestures, function(gesture) {
    //   return (gesture.type == "keyTap");
    // });
    // // if (gestures.length > 0) {
    // //   console.log(gestures.length + " gestures");
    // // }
    // if (prevGestures) {
    //   //look for prev gestures that no longer exist
    //   var endedGestures = _.difference(prevGestures, gestures);
    //   if (endedGestures.length > 0) {
    //     // console.log("ended Gestures:");
    //     // console.log(endedGestures);
    //     _.each(endedGestures, function(gesture) {
    //         // console.log("keyTapEnd, id: " + gesture.id + ", duration: " + gesture.duration);
    //         // console.log(gesture);
    //         Backbone.trigger("keyTapEnd", gesture);
    //         Backbone.trigger("keyTapEnd", gesture);
    //     }); 
    //   }


    //   //look for new gestures that aren't in prev gestures
    //   var startedGestures = _.difference(gestures, prevGestures);
    //   if (startedGestures.length > 0) {
    //     _.each(startedGestures, function(gesture) {
    //         //console.log("keyTapStart, id: " + gesture.id);
    //         Backbone.trigger("keyTapStart", gesture);
    //         Backbone.trigger("keyTapStart", gesture);
    //     });
    //   }

    // }

    // prevGestures = gestures;

  }


}).use('screenPosition', {scale: LEAPSCALE});