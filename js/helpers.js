var WHITE_KEY_WIDTH = 80;
var BLACK_KEY_WIDTH = 60;
var WHITE_KEY_HEIGHT = 400;
var BLACK_KEY_HEIGHT = 220;

//key = value from 0 to 87
var isBlack = function(key) {
  var multiples = [1, 4, 6, 9, 11];
  return (multiples.indexOf(key % 12) > -1);
}

//key = value from 0 to 87
var playNote = function(key) {
 //insert MIDI.js stuff??
}