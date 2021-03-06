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
var errorsMade;

$(document).ready(function() {
  var nextKey = function() {
    $(".key:nth-child(" + notesToNumbers[sequence[i]] + ")").addClass("to-hit");
    $(".to-hit").one("mouseup", function() {
      $(this).removeClass("to-hit");
      i++;
      if (i < sequence.length) {
        nextKey();
      }
      else {
        alert("You completed the task!");
        $(".key").off("mousedown", errorHandler);
        var end = new Date().getTime();
        console.log("Errors: ", errorsMade - sequence.length);
        console.log("Time: ", end - start);
      }
    });
  }

  var errorHandler = function() {
    errorsMade += 1;
  }

  var i = 0;
  errorsMade = 0;
  $(".key").on("mousedown", errorHandler);
  var start = new Date().getTime();
  nextKey();
});