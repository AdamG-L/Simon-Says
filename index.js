var level = 0; //Store current Level
var gameStarted = false; //Store game state
var buttonPattern = []; //Store the button pattern
var index = 0; //Store the guess location

//Game Start code
$(document).keypress(function() {
  if (!gameStarted) {
    updateLevel();
    displayRandomButton();
    gameStarted = true;         //Start state must be after random button has been generated
  }
});


//Logic for when the buttons are clicked and the game has game has started
$(".btn").click(function(e) {
  if (gameStarted) {
    console.log("Index value+ " + index + "Current array value: " + buttonPattern[index] + " Current array length: " + buttonPattern.length);
    if ($(e.target).hasClass("green")) {
      if (buttonPattern[index] == 1) {
        selectButton(1);
        index++;
      } else {
        gameOver();
        return;
      }
    } else if ($(e.target).hasClass("red")) {
      if (buttonPattern[index] == 2) {
        selectButton(2);
        index++;
      } else {
        gameOver();
        return;
      }
    } else if ($(e.target).hasClass("yellow")) {
      if (buttonPattern[index] == 3) {
        selectButton(3);
        index++;
      } else {
        gameOver();
        return;
      }
    } else {
      if (buttonPattern[index] == 4) {
        selectButton(4);
        index++;
      } else {
        gameOver();
        return;
      }
    }
    //If pattern has been completed add one and rest pattern starting point on a short delay
    if (index >= buttonPattern.length) {
      gameStarted = false;
      setTimeout(function() {
        updateLevel();
        displayRandomButton();
        index = 0;
        gameStarted = true;           //Start state must be after random button has been generated
      }, 1000);
    }
  }
});

//Updates the H1 and increments the level number
function updateLevel() {
  level++;
  $("h1").text("Level " + level);
}

//Adds one of four buttons to an array and displays it on screen with sound/visual
function displayRandomButton() {
  var randButton = Math.floor(Math.random() * 4 + 1);
  buttonPattern.push(1);
  selectButton(1);
}

//Selects the given button from 1-4.
function selectButton(button) {
  switch (button) {
    case 1:
      toggleButton(".green");
      var audioGreen = new Audio("sounds/green.mp3");
      audioGreen.play();
      break;
    case 2:
      toggleButton(".red");
      var audioRed = new Audio("sounds/red.mp3");
      audioRed.play();
      break;
    case 3:
      toggleButton(".yellow");
      var audioYellow = new Audio("sounds/yellow.mp3");
      audioYellow.play();
      break;
    case 4:
      toggleButton(".blue");
      var audioBlue = new Audio("sounds/blue.mp3");
      audioBlue.play();
      break;
  }
}

//Flashes the inputed button
function toggleButton(button) {
  $(button).toggleClass("pressed");
  setTimeout(function() {
    $(button).toggleClass("pressed");
  }, 5000);
}

//Displays game over screen and resets gameStarted
function gameOver() {
  $("h1").html("Game Over... Score: " + level + "<br> Press Any Key to Retry!"); //Set GAME OVER text
  var audioWrong = new Audio("sounds/wrong.mp3"); //Play game over audio
  audioWrong.play();

  $("body").toggleClass("game-over");
  setTimeout(function() {
    $("body").toggleClass("game-over");
  }, 500);

  //Reset values.
  level = 0;
  gameStarted = false;
  buttonPattern = [];
  index = 0;
}
