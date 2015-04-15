# 6835piano
piano yo

### midiUtil Functions
 * playNote(noteNumber) - plays the note at a given note number (between 0 and 87)
 * stopNote(noteNumber) - stops any note being plyed at a given note number (between 0 and 87)
 * playChord(array) - plays each note in the array at the same time
 * stopAllNotes() - stops all notes from playing
 * playScale(startingNote, octaves, backDown) - plays a scale with a specified number of octaves, if backDown is true, then player returns to the startingNote
 * getMidiNote(number) - converts from 0-87 to midi note number
 * getKeyNote(number) - converts from midi note number to 0-87 key number

