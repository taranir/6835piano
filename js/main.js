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
    
    handsView.setFingers(sortedFingers); //set hand visualization
    if (CURRENT_MODE == MODES.STATIC_THRESHOLD) {
      hoverView.setFingers(sortedFingers);
    }
    

    handsView.processFingers(sortedFingers); //check for keypresses
    

  }


}).use('screenPosition', {scale: LEAPSCALE});