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

  var sortedFingers = frame.fingers.sort(function(a, b) {
    return a.id - b.id;
  });

  if (frame.fingers.length > 0) {
    console.log(sortedFingers);
  } 
  
  handsView.setFingers(sortedFingers);

}).use('screenPosition', {scale: LEAPSCALE});