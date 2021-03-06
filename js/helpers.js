var HOVER_BOX_WIDTH = 450;
var HOVER_BOX_HEIGHT = 250;

var WHITE_KEY_WIDTH = 90;
var BLACK_KEY_WIDTH = 70;
var WHITE_KEY_HEIGHT = 600;
var BLACK_KEY_HEIGHT = 270;
var NUM_FINGERS = 10;
var LEAPSCALE = 0.6;
var SCREENPOSITION_YOFFSET = 200;
var STATIC_THRESHOLD = 10000; //in screenPosition
var PALM_THRESHOLD = 20000; //in millimeters below palm
var VELOCITY_THRESHOLD = 100;

var CURRENT_HAND_POSITION = 0;


var MODES = {
    STATIC_THRESHOLD : "STATIC_THRESHOLD",
    PALM_THRESHOLD : "PALM_THRESHOLD",
    VELOCITY : "VELOCITY",
    PALM_AND_VELOCITY : "PALM_AND_VELOCITY"
}
var CURRENT_MODE = MODES.STATIC_THRESHOLD;

//key = value from 0 to 87
var isBlack = function(key) {
  var multiples = [1, 4, 6, 9, 11];
  return (multiples.indexOf(key % 12) > -1);
}

var getBlackKeyPosition = function(bk_index, bk_overall) { //bk_index is index into black keys
        var position = 0;
        var sets = Math.floor(bk_overall/12);
        position += sets * WHITE_KEY_WIDTH * 7;
        var index_in_set = bk_index % 5;
        switch (index_in_set) {
                case 0:
                        position += WHITE_KEY_WIDTH - 1/3 * BLACK_KEY_WIDTH;
                        break;
                case 1:
                        position += WHITE_KEY_WIDTH * 3 - 2/3 * BLACK_KEY_WIDTH;
                        break;
                case 2:
                        position += WHITE_KEY_WIDTH * 4 - 1/3 * BLACK_KEY_WIDTH;
                        break;
                case 3:
                        position += WHITE_KEY_WIDTH * 6 - 2/3 * BLACK_KEY_WIDTH;
                        break;
                case 4:
                        position += WHITE_KEY_WIDTH * 7 - 1/2 * BLACK_KEY_WIDTH;
                        break;
        }
        return position;
}

var getKeyString = function(overall) {
        switch (overall % 12) {
                case 0:
                        return "A"
                case 1:
                        return "A#/Bb"
                case 2:
                        return "B"
                case 3:
                        return "C"
                case 4:
                        return "C#/Db"
                case 5:
                        return "D"
                case 6:
                        return "D#/Eb"
                case 7:
                        return "E"
                case 8:
                        return "F"
                case 9:
                        return "F#/Gb"
                case 10:
                        return "G"
                case 11:
                        return "G#/Ab"
        }
}

var convertVelocityToVolume = function(velocity) {
    var volume = Math.sqrt(Math.abs(velocity)/500)*127;
    return volume;
}