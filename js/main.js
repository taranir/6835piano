var keyboardView = new KeyboardView();
var handsView = new HandsView();

// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true};

Leap.loop(controllerOptions, function(frame) {
  // if (frame.fingers === undefined ) {
  //   var fingersLength = 0;
  // } else {
  //   var fingersLength = frame.fingers.length;
  // }
  console.log(frame.fingers);
  handsView.setFingers(frame.fingers);

});