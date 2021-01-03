
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

//click event
$("body").keypress(function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
  gameStarted = true;
 }
});

$("body").on("tap", function() {
  if (!gameStarted) {
    $("#level-title").text("Level " + level);
    nextSequence();
  gameStarted = true;
 }
});

//new level sequence
function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

};

//user click
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//Answer check
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      },200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
};

//Start Over function
function startOver() {
  level = 0;
  gameStarted = false;
  gamePattern = [];
}

//sound and animation
function playSound (name) {
  var sound = new Audio('sounds/'+name+'.mp3');
  sound.play();
};

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
    setTimeout(function(){
      $("." + currentColor).removeClass("pressed");
  },100);
};
