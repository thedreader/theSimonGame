var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userChosenPattern= [];

var started= false;
var level= 0;

$(document).keypress( function (){

  if(started !== true)
  {
    nextSequence();
    $("h1").text("level " + level);
    started= true;

  }

})

$(".btn").click(function (){

  if(started == true)
  {
    var userInput= ($(this).attr("id"));
    userChosenPattern.push(userInput);

    playSound(userInput);
    animatePress(userInput);
    ansCheck(userChosenPattern.length-1);
  }

});

function ansCheck(currentLevel)
{
  if(gamePattern[currentLevel]===userChosenPattern[currentLevel])
  {
    if (gamePattern.length === userChosenPattern.length)
    {
      setTimeout( function (){
        $("h1").text("level " + level);
        nextSequence();
      }, 1000);
    }
  }

  else
  {
    $("h1").text("Game Over! Press any key to restart")
    $(document.body).addClass("game-over");
    new Audio("sounds/wrong.mp3").play();

    setTimeout( function (){
      $(document.body).removeClass("game-over");
    }, 300);

    startOver();
  }
}

function nextSequence(){

  level++;
  userChosenPattern= [];

  var randomChosenNumber= Math.floor(Math.random() * 4);
  var randomChosenColor= buttonColors[randomChosenNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animatePress(randomChosenColor);

}

function playSound(currentColor){

  new Audio("sounds/" + currentColor + ".mp3").play();
}

function animatePress(name){

  $("." + name).addClass("pressed");
  setTimeout( function (){

    $("." + name).removeClass("pressed");
  }, 100);
}

function startOver() {

  level= 0;
  started= false;
  gamePattern= [];
}
