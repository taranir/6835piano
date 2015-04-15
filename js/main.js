var keyboardView = new KeyboardView();
var handsView = new HandsView();

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  if (frame.hands === undefined ) {
    var handsLength = 0;
  } else {
    var handsLength = frame.hands.length;
  }
})