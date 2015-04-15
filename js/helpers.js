var WHITE_KEY_WIDTH = 80;
var BLACK_KEY_WIDTH = 60;
var WHITE_KEY_HEIGHT = 400;
var BLACK_KEY_HEIGHT = 220;
var NUM_FINGERS = 10;
var LEAPSCALE = 0.6;
var SCREENPOSITION_YOFFSET = 200;

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
                case 1:
                        position += WHITE_KEY_WIDTH - 2/3 * BLACK_KEY_WIDTH;
                        break;
                case 2:
                        position += WHITE_KEY_WIDTH * 2 - 1/3 * BLACK_KEY_WIDTH;
                        break;
                case 3:
                        position += WHITE_KEY_WIDTH * 4 - 2/3 * BLACK_KEY_WIDTH;
                        break;
                case 4:
                        position += WHITE_KEY_WIDTH * 5 - 1/2 * BLACK_KEY_WIDTH;
                        break;
                case 0:
                        position += WHITE_KEY_WIDTH * 6 - 1/3 * BLACK_KEY_WIDTH;
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

//key = value from 0 to 87
var playNote = function(key, volume) {
 //insert MIDI.js stuff??
}

var stopNote = function(key, volume) {

}