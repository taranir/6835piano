var notesToNumbers = {
  E: 44,
  D: 42,
  C: 40,
  G: 47,
}

var E = "E";
var D = "D";
var C = "C";
var G = "G";

var sequence = [E, D, C, D, E, E, E, D, D, D, E, G, G, E, D, C, D, E, E, E, D, D, E, D, C]

$(document).ready(function() {
  var i = 0;
  nextKey();

  function nextKey() {
    $(".key:nth-child(" + notesToNumbers[sequence[i]] + ")").addClass("to-hit");
    $(".key:nth-child(" + notesToNumbers[sequence[i]] + ")").one("mouseup", function() {
      $(this).removeClass("to-hit");
      i++;
      if (i < sequence.length) {
        nextKey();
      }
      else {
        alert("You completed the task!");
      }
    });
  }

});