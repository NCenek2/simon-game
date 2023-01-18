// Button Array to represent 0-3
let buttonLength = $(".btn").length;
const buttonArray = ["red", "green", "blue", "yellow"];

// Global Variables
let currentLevel = 1;
let index = 0;
let gameChoices = [];
let userChoices = [];
let userPlaying;

function myLoop() {
  setTimeout(function () {
    // Controls Game Pick
    const randomNumber = buttonArray[Math.floor(Math.random() * buttonLength)];
    handleOpacity(randomNumber);
    // Push the value into the game array
    gameChoices.push(randomNumber);
    // console.log(gameChoices, userChoices);
    // Increase Index to Include More Choices Depending on Level
    index++;
    if (index < currentLevel) {
      myLoop();
    } else {
      // Allows user to Click on Buttons After Test
      userPlaying = true;
    }
  }, 1000);
}

function handleOpacity(id) {
  $(`#${id}`).animate({ opacity: "25%" }).animate({ opacity: "100%" });
}

function compareChoices(levelArr, userArr) {
  for (let i = 0; i < userArr.length; i++) {
    if (levelArr[i] != userArr[i]) {
      return false;
    }
  }
  return true;
}

function resetLevelVariables() {
  index = 0;
  gameChoices = [];
  userChoices = [];
}

function handleLevelChange(level, text) {
  $("h1").text(`${text}`);
  resetLevelVariables();
  setTimeout(() => {
    $("h1").text(`Level ${level}`);
    myLoop();
  }, 1000);
  userPlaying = false;
}

// Handle Opacity Change
$(".btn").click(function (event) {
  if (userPlaying) {
    // Local Variables
    let text = "";
    const lossText = "Try Again!";

    // Push to User Choices on Clicks
    handleOpacity(event.target.id);
    userChoices.push(`${event.target.id}`);

    if (gameChoices.length == userChoices.length && gameChoices.length > 0) {
      if (compareChoices(gameChoices, userChoices)) {
        currentLevel++;
        text = `Level ${currentLevel}`;
        handleLevelChange(currentLevel, text);
      } else {
        currentLevel = 1;
        handleLevelChange(currentLevel, lossText);
        // Handle Loss
      }
    } else {
      // Handles Incremental User Clicks
      if (!compareChoices(gameChoices, userChoices)) {
        currentLevel = 1;
        handleLevelChange(currentLevel, lossText);
      }
    }
  }
});

myLoop();
