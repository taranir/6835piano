var MIN_VOLUME = 0;
var MAX_VOLUME = 127;
var MIN_DURATION = 0;
var MAX_DURATION = 10;
var MIDI_NOTE_OFFSET = 21;

/**
 * load the soundfont into the browser when the document is ready
 */
$(document).ready(function() {
  MIDI.loadPlugin({
      soundfontUrl: "./lib/soundfont/",
      instrument: "acoustic_grand_piano",
      onprogress: function(state, progress) {
          console.log(state, progress);
      },
      onsuccess: function() {
          MIDI.setVolume(0, 127);
          console.log("ready to play notes!");
          // playScale(39, 3, true);
      }
  });
});

/**
 * stop all notes from playing
 */
function stopAllNotes() {
  for (var i=0; i<87; i++) {
    stopNote(i);
  }
}

/**
 * play a list notes all at the same time
 */
function playChord(array) {
  var notes = array;
  for (var i=0; i<notes.length;i++) {
    playNote(notes[i]);
  }
}

/**
 * play a scale beginning from starting note for octaves octaves
 * if backDown, then play the reverse scale back to starting location
 */
function playScale(startingNote, octaves, backDown) {
  var numOctaves = octaves || 1;
  var reverse = backDown===undefined ? false : backDown;
  var noteOffset = [0, 2, 2, 1, 2, 2, 2, 1];
  var scaleOffsets = [];
  var scale = [startingNote];

  // limit it to the maximum number of playable octaves
  if (octaves*12 + startingNote > 87) {
    numOctaves = Math.floor((87 - startingNote)/12);
  }

  for (var i=0;i<numOctaves;i++) {
    if (i === 0) {
      extend(scaleOffsets, noteOffset);
    }
    else {
      extend(scaleOffsets, noteOffset.slice(1));
    }
  }
  console.log(scaleOffsets);

  var reversed = scaleOffsets.slice().reverse();
  reversed = scalarMultiply(reversed, -1);
  if (reverse) {
    extend(scaleOffsets, reversed.slice(0, reversed.length - 1));
  }
  console.log(scaleOffsets);

  for (var i=1;i<scaleOffsets.length;i++) {
    scale.push(scale[scale.length-1] + scaleOffsets[i]);
  }
  console.log(scale);
  playNoteSequence(scale, 480);

}

/**
 * play a series of notes at mm notes per minute (ignore i)
 */
function playNoteSequence(array, mm, i) {
  var bpm = mm || 120;
  var beatNumber = i || 0;
  if (array.length > 0) {
    if (beatNumber === 0) {
      playNote(array[0], 96);
    }
    else {
      playNote(array[0], 48);
    }
    setTimeout(function() {
      playNoteSequence(array.slice(1), bpm, (beatNumber + 1) % 4);
    }, 60000/bpm);
  }
  else {
    setTimeout(function() {
      stopAllNotes();
    }, 3*60000/bpm);
  }
}

/**
 * play a note given its key number (0-87) and volume,
 * if no volume provided, it plays at average volume
 */
function playNote(noteNumber, volume) {
  var volume = volume || (MAX_VOLUME + MIN_VOLUME) / 2;
  MIDI.noteOn(0, getMidiNote(noteNumber), volume, 0);
}

/**
 * stop a note given its key number (0-87)
 */
function stopNote(noteNumber) {
  MIDI.noteOff(0, getMidiNote(noteNumber), 0);
}

/**
 * determine how long to hold the note for
 */ 
function secretDurationFunction(volume) {
  return 60000/520;
  return clampDuration(Math.sqrt(volume/MAX_VOLUME * MAX_DURATION));
}
/**
 * clamp the volume between MIN_VOLUME and MAX_VOLUME
 */
function clampVolume(volume) {
  return Math.max(MIN_VOLUME, Math.min(MAX_VOLUME, volume));
}

/**
 * clamp the duration between MIN_DURATION and MAX_DURATION
 */
function clampDuration(duration) {
  return Math.max(MIN_DURATION, Math.min(MAX_DURATION, duration));
}

/**
 * get the MIDI note number given the key number (0-87);
 */
function getMidiNote(keyNumber) {
  return keyNumber + MIDI_NOTE_OFFSET;
}

/**
 * get the key number (0-87) given the MIDI note number
 */
function getKeyNote(midiNumber) {
  return midiNumber - MIDI_NOTE_OFFSET;
}

function extend(a, b) {
  return a.push.apply(a, b);
}

function scalarMultiply(a, c) {
  var array = [];
  for (var i=0; i<a.length; i++) {
    array.push(a[i]*c);
  }
  return array
}
