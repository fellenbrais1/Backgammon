"use strict";

const mainDisplay = document.querySelector(".main_display");
const introDisplay = document.querySelector(".intro_display");
const playButton = document.querySelector(".play_button");

const gamestartBox = document.querySelector(".gamestart_block");
const buttonGamestartFun = document.querySelector(".gamestart_button_fun");
const buttonGamestartPro = document.querySelector(".gamestart_button_pro");
const greyOverlay = document.querySelector(".grey_overlay");

const gameBoard = document.querySelector(".game_board");

const diceButton = document.querySelector(".button_dice");
const chatButton = document.querySelector(".button_chat");
const playersButton = document.querySelector(".button_players");
const rulesButton = document.querySelector(".button_rules");
const loginButton = document.querySelector(".button_login");
const settingsButton = document.querySelector(".button_settings");
const gamesButton = document.querySelector(".button_games");
// const clsButton = document.querySelector(".button_cls");

const floatingButtonsLeft = document.querySelector(".floating_buttons_left");
const floatingButtonsRight = document.querySelector(".floating_buttons_right");

const diceDisplay = document.querySelector(".dice_roller");
const buttonRoll1 = document.querySelector(".dice_button_roll1");
const buttonRoll2 = document.querySelector(".dice_button_roll2");
const diceFace1 = document.querySelector(".dice_img1");
const diceFace2 = document.querySelector(".dice_img2");
const diceRollResult = document.querySelector(".dice_result_display");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDIA: SOUNDS

const openingJingle = document.getElementById("opening_jingle");

const diceRollSound = document.getElementById("dice_roll_sound");

const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const number3 = document.getElementById("number3");
const number4 = document.getElementById("number4");
const number5 = document.getElementById("number5");
const number6 = document.getElementById("number6");
const number7 = document.getElementById("number7");
const number8 = document.getElementById("number8");
const number9 = document.getElementById("number9");
const number10 = document.getElementById("number10");
const number11 = document.getElementById("number11");
const number12 = document.getElementById("number12");

// Empty user object to be written to during operation
let userObject = {
  displayName: "",
  ip: "",
};

let userIP;
let userDisplayName;

// User IP address to be stored on this variable during calculation
let userIPAddress;

// The number of faces on the dice for the dice rollers
const faces = 6;

window.addEventListener("load", () => {
  showMain();
});

diceButton.addEventListener("click", () => {
  toggleClass(diceDisplay, "removed");
  setTimeout(() => {
    toggleClass(diceDisplay, "hidden");
    toggleClass(buttonRoll1, "no_pointer_events");
    toggleClass(buttonRoll2, "no_pointer_events");
    toggleClass(diceButton, "no_pointer_events");
  }, 60);
});

buttonRoll1.addEventListener("click", () => {
  rollOneDie();
  toggleClass(buttonRoll1, "no_pointer_events");
  toggleClass(buttonRoll2, "no_pointer_events");
});

buttonRoll2.addEventListener("click", () => {
  rollTwoDice();
  toggleClass(buttonRoll1, "no_pointer_events");
  toggleClass(buttonRoll2, "no_pointer_events");
});

function showMain() {
  mainDisplay.classList.add("show");
  mainDisplay.classList.add("scroll_on_left");
  floatingButtonsLeft.classList.add("show");
  floatingButtonsRight.classList.add("show");
  setTimeout(() => {
    floatingButtonsLeft.classList.add("scroll_on_top");
    floatingButtonsRight.classList.add("scroll_on_top");
  }, 10);
}

playButton.addEventListener("click", () => {
  toggleClass(introDisplay, "hidden");
  openingJingle.play();
  setTimeout(() => {
    toggleClass(introDisplay, "removed");
  }, 1000);
});

// Toggles the opacity of a specified element by adding/ removing the helper class 'hidden'
// function toggleOpacity(pageElement) {
//   console.log(`This code is running`);
//   pageElement.classList.contains("hidden")
//     ? pageElement.classList.remove("hidden")
//     : pageElement.classList.add("hidden");
//   console.log(pageElement.classList);
// }

// Toggles the display setting of a specified element by adding/ removing the helper class 'removed'
// function toggleDisplay(pageElement) {
//   console.log(`This code is running`);
//   pageElement.classList.contains("removed")
//     ? pageElement.classList.remove("removed")
//     : pageElement.classList.add("removed");
//   console.log(pageElement.classList);
// }

// function togglePointerEvents(pageElement) {
//   console.log(`This code is running`);
//   pageElement.classList.contains("no_pointer_events")
//     ? pageElement.classList.remove("no_pointer_events")
//     : pageElement.classList.add("no_pointer_events");
//   console.log(pageElement.classList);
// }

function toggleClass(pageElement, property) {
  console.log(`This code is running`);
  pageElement.classList.contains(property)
    ? pageElement.classList.remove(property)
    : pageElement.classList.add(property);
  console.log(pageElement.classList);
}

buttonGamestartFun.addEventListener("click", () => {
  displayFunBoard();
  // toggleDropdowns();
});

buttonGamestartPro.addEventListener("click", () => {
  displayProBoard();
  // toggleDropdowns();
});

// Displays the fun game board - To be changed later to the fun game logic, can use the standard dice roller
// Called by an eventHandler on the 'Fun Game' button
function displayFunBoard() {
  gameBoard.src = "img/backgammon.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
  autoRun("guest");
  // const opponentName = getOpponentName();
  console.log(userDisplayName);
  // startGameMessages("fun", userDisplayName, opponentName);
}

// Displays the professional game board - To be changed later to the professional game logic, also needs to change the dice roller elements to a professional version
// Called by an eventHandler on the 'Professional Game' button
function displayProBoard() {
  gameBoard.src = "img/backgammonHard.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
  autoRun("guest");
  // const opponentName = getOpponentName();
  console.log(userDisplayName);
  // startGameMessages("pro", userDisplayName, opponentName);
}

function autoRun(tag = "") {
  setUpUserData();
  setTimeout(() => {
    if (tag !== "guest") {
      addDisplayName();
    }
    console.log(`userObject: `, userObject);
  }, 1000);
}

// Fetches the user's IP address and assigns it to the userObject object for use in the rest of the program
// Called by autoRun()
function setUpUserData() {
  console.log(`Set up running...`);
  fetchData(); // Calls the async function
  setUserIP(); // Assigns the fetched value to the userObject

  // Gets the user's IP address using the async/await syntax
  // Called by setUpUserData()
  async function fetchData() {
    userIPAddress = await getUserIP();
    return userIPAddress;
  }
}

// Fetches the user's IP address from an API and returns it
// Called by fetchData() inside setUpUserData()
async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    userIPAddress = data.ip;
    console.log(`Success fetching IP Address of User`);
    return userIPAddress;
  } catch (error) {
    console.error("Error fetching IP:", error);
    return "Unknown";
  }
}

// TODO - NEEDS TESTING WITH DIFFERENT TIMINGS AND A MORE COMPLEX ENVIRONMENT, SLOWER OVER REAL INTERNET?
// Assigns the value of the user's IP address in steps long enough for the async function to properly return a result
// Called by setUpUserData()
function setUserIP() {
  setTimeout(() => {
    console.log(`userIPAddress: `, userIPAddress);
  }, 300);
  setTimeout(() => {
    userObject.ip = userIPAddress;
    console.log(`userObject:`, userObject);
  }, 350);
  setTimeout(() => {
    console.log(`Set up complete!`);
    return;
  }, 400);
}

// TODO - NEEDS TO BE OPTIONAL FOR THE USER IN FUTURE
// Allows a user to choose a display name via prompt
// Called by autoRun()
function addDisplayName() {
  userObject.displayName = prompt(
    `What would you like your display name to be?`
  );
  if (!userObject.displayName) {
    window.alert(`No display name given, defaulting to 'Guest'`);
    userObject.displayName = "Guest";
  }
  return;
}

// TODO - TO BE REPLACED WITH REAL LOGIC CAPTURING THE OTHER PLAYER'S IP ADDRESS LATER - ALSO NEEDS TO BE IMPLEMENTED INTO DISPLAYING THE OTHER USERS CHAT MESSAGES
// Gets the name of the other player for use in the chatbox display messages
// Called by displayFunBoard(), displayProBoard()
// function getOpponentName() {
//   console.log(`This code is running - getOpponentName()`);
//   const opponentName = "PLAYER 2";
//   return opponentName;
// }

// Attaching resetGame() to the 'Toggle Game - TEST' button
const gameToggler = document.querySelector(".toggle_game_button");
gameToggler.addEventListener("click", resetGame);

// Experimental function to reset the gamestart_block element and the image displayed in the gamebox, will later be assimilated into the page as a game reset type button
// Called by an eventHandler on the 'Toggle Game - TEST' button
function resetGame() {
  gamestartBox.style.display = "grid";
  greyOverlay.style.display = "block";
  gameBoard.src = "img/backgammon.jpg";
}

///////////////////////////////
// DICE ROLLERS

// Creates a random dice roll based on the specified number of die faces for the program (default: 6)
function diceRoller() {
  return Math.round(Math.random() * (faces - 1)) + 1;
}

// Simulates a one dice roll
// Called by an eventHandler on the 'One dice roll' button
function rollOneDie() {
  let diceResult = 0;
  diceFace2.style.opacity = 0;
  diceRollSound.play();
  const target1 = diceFace1;
  rollingAnimation(target1);
  setTimeout(() => {
    const roll1 = diceRoller();
    console.log(`Roll 1: `, roll1);
    cycleDieFaces(roll1, "set", target1);
    diceRollResult.textContent = roll1;
    Number((diceResult = roll1));
  }, 1010);
  setTimeout(() => {
    toggleClass(diceRollResult, "dice_result_display_final");
    playDiceSound(diceResult);
  }, 1110);
  setTimeout(() => {
    hideDiceRoller();
  }, 2500);
}

// Simulates a two dice roll
// Called by an eventHandler on the 'Two dice roll' button
function rollTwoDice() {
  let diceResult = 0;
  diceFace2.style.opacity = 1;
  diceRollSound.play();
  const target1 = diceFace1;
  const target2 = diceFace2;
  rollingAnimation(target1);
  rollingAnimation(target2);
  setTimeout(() => {
    const roll1 = diceRoller();
    const roll2 = diceRoller();
    cycleDieFaces(roll1, "set", target1);
    cycleDieFaces(roll2, "set", target2);
    console.log(`Roll 1: ${roll1}, Roll 2: ${roll2}`);
    const totalRoll = roll1 + roll2;
    console.log(`Total: ${totalRoll}`);
    diceRollResult.textContent = totalRoll;
    Number((diceResult = totalRoll));
  }, 1010);
  setTimeout(() => {
    toggleClass(diceRollResult, "dice_result_display_final");
    playDiceSound(diceResult);
  }, 1110);
  setTimeout(() => {
    hideDiceRoller();
  }, 2500);
}

// Creates an animation of the dice faces cycling through their possibles, every 100 milliseconds for 2 seconds.
// Called by rollOneDice(), rollTwoDice()
function rollingAnimation(target) {
  let rollInterval = setInterval(() => {
    cycleDieFaces(null, "random", target);
  }, 100);
  setTimeout(() => {
    clearInterval(rollInterval);
  }, 1000);
}

function playDiceSound(result) {
  console.log(`RUNNING`);
  console.log(result);
  let sound;
  switch (result) {
    case 1:
      sound = number1;
      break;
    case 2:
      sound = number2;
      break;
    case 3:
      sound = number3;
      break;
    case 4:
      sound = number4;
      break;
    case 5:
      sound = number5;
      break;
    case 6:
      sound = number6;
      break;
    case 7:
      sound = number7;
      break;
    case 8:
      sound = number8;
      break;
    case 9:
      sound = number9;
      break;
    case 10:
      sound = number10;
      break;
    case 11:
      sound = number11;
      break;
    case 12:
      sound = number12;
      break;
  }
  console.log(sound);
  sound.play();
}

// Changes the face of the targetted dice depending on the result of a roll.
// If the flag argument is 'set' the function will only set the dice image based on the result argument, not use a calculated new random dice roll number.
// Called by rollOneDice(), rollTwoDice(), rollingAnimation()
function cycleDieFaces(result = null, flag = "random", target) {
  if (flag !== "set") {
    result = diceRoller();
  }
  if (result !== null) {
    switch (result) {
      case 1:
        target.src = "img/dice-one.png";
        break;
      case 2:
        target.src = "img/dice-two.png";
        break;
      case 3:
        target.src = "img/dice-three.png";
        break;
      case 4:
        target.src = "img/dice-four.png";
        break;
      case 5:
        target.src = "img/dice-five.png";
        break;
      case 6:
        target.src = "img/dice-six.png";
        break;
    }
  }
}

function hideDiceRoller() {
  toggleClass(diceDisplay, "removed");
  setTimeout(() => {
    toggleClass(diceDisplay, "hidden");
    toggleClass(diceRollResult, "dice_result_display_final");
    toggleClass(diceButton, "no_pointer_events");
  }, 60);
}

///////////////////////////////
