//////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CODE

"use strict";

console.log(`Backgammon page script V2`);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENT SELECTION

// Main overlay elements
const mainDisplay = document.querySelector(".main_display");
const introDisplay = document.querySelector(".intro_display");
const playButton = document.querySelector(".play_button");

// Game start elements
const gamestartBox = document.querySelector(".gamestart_block");
const buttonGamestartFun = document.querySelector(".gamestart_button_fun");
const buttonGamestartPro = document.querySelector(".gamestart_button_pro");
const greyOverlay = document.querySelector(".grey_overlay");

// Game board elements
const gameBoard = document.querySelector(".game_board");

// Sidebar button sections
const floatingButtonsLeft = document.querySelector(".floating_buttons_left");
const floatingButtonsRight = document.querySelector(".floating_buttons_right");

// Sidebar button elements
const diceButton = document.querySelector(".button_dice");
const chatButton = document.querySelector(".button_chat");
const playersButton = document.querySelector(".button_players");
const rulesButton = document.querySelector(".button_rules");
const loginButton = document.querySelector(".button_login");
const settingsButton = document.querySelector(".button_settings");
const otherGamesButton = document.querySelector(".button_other_games");
const clsButton = document.querySelector(".button_cls");

// Dice section elements
const diceSection = document.querySelector(".dice_section");
const buttonRoll1 = document.querySelector(".dice_button_roll1");
const buttonRoll2 = document.querySelector(".dice_button_roll2");
const diceFace1 = document.querySelector(".dice_img1");
const diceFace2 = document.querySelector(".dice_img2");
const diceRollResult = document.querySelector(".dice_result_display");
const diceXButton = document.querySelector(".dice_x_button");

// Chatbox section elements
const chatboxSection = document.querySelector(".chatbox_section");
const chatBoxDisplay = document.querySelector(".chatbox_display");
const chatboxInput = document.getElementById("chatbox_input");
const chatXButton = document.querySelector(".chat_x_button");
const chatNotification = document.querySelector(".chat_notifications");

// Players section elements
const playersSection = document.querySelector(".players_section");
const playersXButton = document.querySelector(".players_x_button");
const playersFriends = document.querySelector(".players_friends");
const playersPlayedBefore = document.querySelector(".players_played_before");
const playersCurrentlyActive = document.querySelector(
  ".players_currently_active"
);
const onlinePlayerToggleGraphic = document.querySelector(
  ".toggle_online_graphic"
);
const onlinePlayersToggleButton = document.querySelector(
  ".toggle_online_graphic p"
);

const freePlayersToggleGraphic = document.querySelector(".toggle_free_graphic");

const freePlayersToggleButton = document.querySelector(
  ".toggle_free_graphic p"
);

// Rules section elements
const rulesSection = document.querySelector(".rules_section");
const rulesXButton = document.querySelector(".rules_x_button");

// Login section elements
const loginSection = document.querySelector(".login_section");
const loginXButton = document.querySelector(".login_x_button");
const loginUsernameField = document.getElementById("login_username_input");
const loginPasswordField = document.getElementById("login_password_input");
const loginSubmitButton = document.querySelector(
  ".login_section_submit_button"
);
const loginInfoDisplay = document.querySelector(".login_section_info_display");
const signupButton = document.querySelector(".signup_button");

// Signup section elements
const signupSection = document.querySelector(".signup_section");
const signupXButton = document.querySelector(".signup_x_button");
const signupUsernameField = document.getElementById("signup_username_input");
const signupPasswordField = document.getElementById("signup_password_input");
const signupSubmitButton = document.querySelector(
  ".signup_section_submit_button"
);
const signupInfoDisplay = document.querySelector(
  ".signup_section_info_display"
);
const backToLoginButton = document.querySelector(".back_to_login_button");

// Settings section elements
const settingsSection = document.querySelector(".settings_section");
const settingsXButton = document.querySelector(".settings_x_button");

// Other games section elements
const otherGamesSection = document.querySelector(".other_games_section");
const otherGamesDisplay = document.querySelector(".other_games_display");
const otherGamesXButton = document.querySelector(".other_games_x_button");

// Player names section elements
const player1NameSection = document.querySelector(".name_section.player1");
const player1Name = document.querySelector(".name_player1");
const player1Portait = document.querySelector(".player_portrait1");
const player1Rating = document.querySelector(".player_rating1");

const versusSection = document.querySelector(".versus_section");

const player2NameSection = document.querySelector(".name_section.player2");
const player2Name = document.querySelector(".name_player2");
const player2Portait = document.querySelector(".player_portrait2");
const player2Rating = document.querySelector(".player_rating2");

/* Cookie bar section elements */
const cookieBar = document.querySelector(".cookie_permission");
const cookieAgreeButton = document.querySelector(".cookie_accept_button");
const cookieDisagreeButton = document.querySelector(".cookie_reject_button");

/* Debug elements */
// TESTING OTHER USER MESSAGES
const adDisabler = document.querySelector(".toggle_ads_button");
const gameToggler = document.querySelector(".toggle_game_button");
const cookieClearer = document.querySelector(".clear_cookie_button");
const askJack = document.querySelector(".ask_jack_button");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDIA: SOUNDS

// Page sounds
const buttonClickSound = document.getElementById("button_click_sound");
const openingJingle = document.getElementById("opening_jingle");

// Dice sounds
const diceRollSound = document.getElementById("dice_roll_sound");

// Spoken numbers
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

// Chat sounds
const chatPop = document.getElementById("chat_sound");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENERS

window.addEventListener("load", () => {
  showMain();
});

diceButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(diceSection, "removed");
  setTimeout(() => {
    toggleClass(diceSection, "hidden");
    toggleClass(diceSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
  }, 60);
});

buttonRoll1.addEventListener("click", () => {
  rollOneDie();
});

buttonRoll2.addEventListener("click", () => {
  rollTwoDice();
});

diceXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(diceSection, "hidden");
  setTimeout(() => {
    toggleClass(diceSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(diceSection, "removed");
  }, 60);
});

chatButton.addEventListener("click", () => {
  playClickSound();
  clearChatNotification();
  toggleClass(chatboxSection, "removed");
  setTimeout(() => {
    toggleClass(chatboxSection, "hidden");
    toggleClass(chatboxSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
  }, 60);
  setTimeout(() => {
    displayLatestMessage();
  }, 1000);
});

chatXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(chatboxSection, "hidden");
  if (chatNotification.textContent != 0) {
    toggleClass(chatNotification, "hidden");
  }
  setTimeout(() => {
    toggleClass(chatboxSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(chatboxSection, "removed");
  }, 60);
});

chatboxInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addChatMessage();
  }
});

playersButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(playersSection, "removed");
  setTimeout(() => {
    toggleClass(playersSection, "hidden");
    toggleClass(playersSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    if (playersPopulatedFlag === false) {
      populatePlayers(experimentalFriends, playersFriends);
      populatePlayers(experimentalFriends, playersPlayedBefore);
      populatePlayers(experimentalFriends, playersCurrentlyActive);
      playersPopulatedFlag = true;
    }
  }, 60);
});

playersXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(playersSection, "hidden");
  setTimeout(() => {
    toggleClass(playersSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(playersSection, "removed");
  }, 60);
});

onlinePlayersToggleButton.addEventListener("click", () => {
  playClickSound();
  toggleOnlinePlayersOnly();
  toggleClass(onlinePlayerToggleGraphic, "toggled_right");
  toggleClass(onlinePlayersToggleButton, "toggled_right_button");
});

freePlayersToggleButton.addEventListener("click", () => {
  playClickSound();
  toggleFreePlayersOnly();
  toggleClass(freePlayersToggleGraphic, "toggled_right");
  toggleClass(freePlayersToggleButton, "toggled_right_button");
});

rulesButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(rulesSection, "removed");
  setTimeout(() => {
    toggleClass(rulesSection, "hidden");
    toggleClass(rulesSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
  }, 60);
});

rulesXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(rulesSection, "hidden");
  setTimeout(() => {
    toggleClass(rulesSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(rulesSection, "removed");
  }, 60);
});

loginButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(loginSection, "removed");
  setTimeout(() => {
    toggleClass(loginSection, "hidden");
    toggleClass(loginSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
  }, 60);
});

loginXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(loginSection, "hidden");
  setTimeout(() => {
    clearLoginInputFields();
    clearSignupInputFields();
    toggleClass(loginSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(loginSection, "removed");
  }, 60);
});

loginUsernameField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

loginPasswordField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

loginSubmitButton.addEventListener("click", () => {
  if (loginUsernameField.value !== "" && loginPasswordField.value !== "") {
    userLogin(loginUsernameField.value, loginPasswordField.value);
  } else
    loginInfoDisplay.textContent = `Please enter both a username and password.`;
  setTimeout(() => {
    loginInfoDisplay.textContent = `Please enter your details to log in.`;
    clearLoginInputFields();
  }, 2000);
});

signupButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(signupSection, "removed");
  setTimeout(() => {
    toggleClass(signupSection, "hidden");
    toggleClass(signupSection, "no_pointer_events");
  }, 60);
});

signupXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(loginSection, "hidden");
  toggleClass(signupSection, "hidden");
  setTimeout(() => {
    clearLoginInputFields();
    clearSignupInputFields();
    toggleClass(loginSection, "no_pointer_events");
    toggleClass(signupSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(loginSection, "removed");
    toggleClass(signupSection, "removed");
  }, 60);
});

signupUsernameField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

signupPasswordField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

signupSubmitButton.addEventListener("click", () => {
  if (signupUsernameField.value !== "" && signupPasswordField.value !== "") {
    userSignup(signupUsernameField.value, signupPasswordField.value);
  } else {
    signupInfoDisplay.textContent = `Please enter both a username and a password.`;
    setTimeout(() => {
      signupInfoDisplay.textContent = `Please enter your details to log in.`;
    }, 2000);
  }
});

backToLoginButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(signupSection, "removed");
  setTimeout(() => {
    toggleClass(signupSection, "hidden");
    toggleClass(signupSection, "no_pointer_events");
  }, 60);
});

settingsButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(settingsSection, "removed");
  setTimeout(() => {
    toggleClass(settingsSection, "hidden");
    toggleClass(settingsSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
  }, 60);
});

settingsXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(settingsSection, "hidden");
  setTimeout(() => {
    toggleClass(settingsSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(settingsSection, "removed");
  }, 60);
});

otherGamesButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(otherGamesSection, "removed");
  setTimeout(() => {
    toggleClass(otherGamesSection, "hidden");
    toggleClass(otherGamesSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    populateOtherGames(otherGamesHTML);
    addCurrentGameClass(currentGameFlag);
    otherGamesPopulatedFlag = true;
  }, 60);
});

otherGamesXButton.addEventListener("click", () => {
  playClickSound();
  toggleClass(otherGamesSection, "hidden");
  setTimeout(() => {
    toggleClass(otherGamesSection, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(otherGamesSection, "removed");
  }, 60);
});

clsButton.addEventListener("click", playClickSound);

playButton.addEventListener("click", () => {
  toggleClass(introDisplay, "hidden");
  openingJingle.play();
  setTimeout(() => {
    toggleClass(introDisplay, "removed");
  }, 1000);
});

buttonGamestartFun.addEventListener("click", () => {
  playClickSound();
  displayFunBoard();
});

buttonGamestartPro.addEventListener("click", () => {
  playClickSound();
  displayProBoard();
});

window.addEventListener("DOMContentLoaded", () => {
  cookieCheck("userDetails");
});

cookieAgreeButton.addEventListener("click", setCookieUserDetails);
cookieDisagreeButton.addEventListener("click", rejectCookies);

askJack.addEventListener("click", () => {
  pretendOpponentMessage();
  if (chatNotification.textContent == 0) {
    toggleClass(chatNotification, "hidden");
  }
  addChatNotification();
});

gameToggler.addEventListener("click", resetGame);

// Test function call to delete the cookie and reload the page
// Called by an eventHandler on the 'Clear Cookie - TEST' button
cookieClearer.addEventListener("click", () => {
  const cookieName = "userDetails";
  clearCookie(cookieName);
  location.reload();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES

// The number of faces on the dice for the dice rollers
const faces = 6;

// Empty user object to be written to during operation
let userObject = {
  displayName: "",
  ip: "",
};

// User IP address to be stored on this variable during calculation
let userIPAddress;

// Variable used to alternate message format in the chatbox
let userMessageStyleToggle = false;
let opponentMessageStyleToggle = false;

// Allows video ads to be disabled, for example in premium mode
let videoAdsDisabled = true;

// Counts the number of played games in order to display ads
let playedGames = 0;

// EXPERIMENTAL

let userIP;
let userDisplayName;

let nameIsGuest = false;

const experimentalFriends = [
  "Bob",
  "Timmy",
  "Elizabeth",
  "Arcturus",
  "Sarah",
  "Grant",
  "Zeratul",
  "Ayako",
  "Michael",
  "William",
  "Dolores",
  "Jimmy",
  "Artanis",
  "Zagarra",
  "Tommy",
  "Biblobba",
  "Squiglogs",
  "Roboute",
  "Jason",
  "Jessica",
  "Takeshi",
];

const playersOnline = [
  "Sarah",
  "Grant",
  "Zeratul",
  "Ayako",
  "Michael",
  "William",
  "Tommy",
  "Biblobba",
  "Squiglogs",
  "Roboute",
  "Jason",
  "Takeshi",
];

const userFriends = [
  "Bob",
  "Timmy",
  "Elizabeth",
  "Arcturus",
  "Michael",
  "William",
  "Tommy",
  "Biblobba",
  "Takeshi",
];

const userPlayedBefore = [
  "Bob",
  "Timmy",
  "Elizabeth",
  "Arcturus",
  "Michael",
  "William",
  "Tommy",
  "Biblobba",
  "Squiglogs",
  "Roboute",
  "Jason",
  "Jessica",
  "Takeshi",
];

const playersInGame = ["Michael", "Ayako", "Zeratul", "Squiglogs"];

// To be used to store test playerObjects to use
const playersObjectArr = [
  {
    username: "fellenbrais",
    password: "sorenson1",
    displayName: "Michael",
    playerPortrait: "img/portrait_male.png",
    portraitColour: "#A020F0",
    playerRating: 63,
    member: true,
    languages: ["english"],
    friends: userFriends,
  },
  {
    username: "ayachan",
    password: "cutie1",
    displayName: "Ayako",
    playerPortrait: "img/portrait_female.png",
    portraitColour: "#FFD700",
    playerRating: 205,
    member: false,
    languages: ["english", "japanese"],
    friends: userFriends,
  },
  {
    username: "lastenvoy",
    password: "falconer1",
    displayName: "Takeshi",
    playerPortrait: "img/portrait_male.png",
    portraitColour: "#FF0000",
    playerRating: 142,
    member: true,
    languages: ["japanese"],
    friends: userFriends,
  },
];

let toggleOnlineOnlyFlag = false;
let toggleFreeOnlyFlag = false;
let playersPopulatedFlag = false;
let otherGamesPopulatedFlag = false;

const otherGamesBackgammonButtonHTML = `<div class="game_button_backgammon" title="Backgammon">
    <img src="img/MOMABackgammon.png" alt="Backgammon game picture" />
    <p>Backgammon</p>
  </div>`;

const otherGamesMurderMansionButtonHTML = `<div class="game_button_murder_mansion" title="Murder Mansion">
  <img src="img/murderMansion.jpg" alt="Murder Mansion game picture" />
  <p>Murder Mansion</p>
</div>`;

const otherGamesHTML = [
  otherGamesBackgammonButtonHTML,
  otherGamesMurderMansionButtonHTML,
];

const currentGameFlag = "Backgammon";

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

function showMain() {
  mainDisplay.classList.add("show");
  mainDisplay.classList.add("scroll_on_left");
  floatingButtonsLeft.classList.add("show");
  floatingButtonsRight.classList.add("show");
  setTimeout(() => {
    floatingButtonsLeft.classList.add("scroll_on_top");
    floatingButtonsRight.classList.add("scroll_on_top");
  }, 10);
  setTimeout(() => {
    player1NameSection.classList.add("show");
    player1NameSection.classList.add("scroll_on_top");
  }, 2000);
}

function toggleClass(pageElement, property) {
  console.log(`This code is running`);
  console.log(pageElement);
  pageElement.classList.contains(property)
    ? pageElement.classList.remove(property)
    : pageElement.classList.add(property);
  console.log(pageElement.classList);
}

// Displays the fun game board - To be changed later to the fun game logic, can use the standard dice roller
// Called by an eventHandler on the 'Fun Game' button
function displayFunBoard() {
  gameBoard.src = "img/backgammon.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
  initializeCookie("guest");
  const opponentName = getOpponentName();
  console.log(userDisplayName);
  startGameMessages("fun", userDisplayName, opponentName);
}

// Displays the professional game board - To be changed later to the professional game logic, also needs to change the dice roller elements to a professional version
// Called by an eventHandler on the 'Professional Game' button
function displayProBoard() {
  gameBoard.src = "img/backgammonHard.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
  initializeCookie("guest");
  const opponentName = getOpponentName();
  console.log(userDisplayName);
  startGameMessages("pro", userDisplayName, opponentName);
}

// TODO - TO BE REPLACED WITH REAL LOGIC CAPTURING THE OTHER PLAYER'S IP ADDRESS LATER - ALSO NEEDS TO BE IMPLEMENTED INTO DISPLAYING THE OTHER USERS CHAT MESSAGES
// Gets the name of the other player for use in the chatbox display messages
// Called by displayFunBoard(), displayProBoard()
function getOpponentName() {
  console.log(`This code is running - getOpponentName()`);
  const opponentName = "PLAYER 2";
  return opponentName;
}

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
  toggleClass(diceSection, "removed");
  setTimeout(() => {
    toggleClass(diceSection, "hidden");
    toggleClass(diceSection, "no_pointer_events");
    toggleClass(floatingButtonsLeft, "no_pointer_events");
    toggleClass(floatingButtonsRight, "no_pointer_events");
    toggleClass(diceRollResult, "dice_result_display_final");
  }, 60);
}

///////////////////////////////
// CHAT BOX

// Captures a users chat message from the input box and adds it to the chat display
// Called by an eventHandler when pressing enter in the chat input box
function addChatMessage() {
  const message = chatboxInput.value;
  console.log(message);
  chatboxInput.value = "";
  const messageHTML = createChatMessage(message);
  postChatMessage(messageHTML);
  displayLatestMessage();
}

// Assembles and returns  an HTML literal string to add to the chat display element
// Called by addChatMessage()
function createChatMessage(message) {
  const timeStamp = getTimeStamp();
  const messageClass = userMessageStyleToggle
    ? "chatbox_entry_a"
    : "chatbox_entry_b";
  const displayName = getUserDisplayName();
  console.log(displayName);
  const messageHTML = `<p class='${messageClass}'><strong class='player_name'>${displayName}:</strong> ${message} - ${timeStamp}</p>`;
  userMessageStyleToggle = userMessageStyleToggle ? false : true;
  console.log(messageHTML);
  return messageHTML;
}

// Generates a time stamp in minutes and seconds when a message is added to the chat display
// Called by createChatMessage()
function getTimeStamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

// Adds a chat message HTML literal string to the chat display elements innerHTML
// Called by addChatMessage()
function postChatMessage(messageHTML, position = "beforeend") {
  chatBoxDisplay.insertAdjacentHTML(position, messageHTML);
  console.log(`Message content: ${messageHTML}`);
}

// Scrolls the chat box display down to the lcoation of the latest message - could be annoying when trying to look back through chats later? - UX?
// Called by addChatMessage()
function displayLatestMessage() {
  chatBoxDisplay.scrollTop = chatBoxDisplay.scrollHeight;
}

// Captures the users display name or 'Guest' if one is not set and returns it
// Called by startGameMessages(), createChatMessage()
function getUserDisplayName() {
  const displayName =
    userDisplayName === undefined || userDisplayName === null
      ? "Guest"
      : userDisplayName;
  return displayName;
}

// Generates and posts a chatbox message from a pretend opponent
// Called by an eventHandler on the 'Ask Jack - TEST' button
function pretendOpponentMessage() {
  const messageHTML = createOpponentMessage(
    "Jack",
    "That would be an ecumenical matter..."
  );
  postChatMessage(messageHTML);
  displayLatestMessage();
}

// TODO -
// Creates a message form an opponent to them be posted in the chatbox, message styling is unique to the opponent to differentiate between player 1 and player 2
// Called by pretendOpponentMessage()
function createOpponentMessage(opponentName, message) {
  const timeStamp = getTimeStamp();
  const messageClass = opponentMessageStyleToggle
    ? "chatbox_entry_e"
    : "chatbox_entry_f";
  const messageHTML = `<p class='${messageClass}'><strong class='opponent_name'>${opponentName}:</strong> ${message} - ${timeStamp}</p>`;
  opponentMessageStyleToggle = opponentMessageStyleToggle ? false : true;
  console.log(messageHTML);
  return messageHTML;
}

// Plays the set click sound for the webpage
// Called by
function playClickSound() {
  buttonClickSound.play();
}

// TODO - ADD DISPLAY OF PLAYERS SCORES/ RATINGS LATER
// Displays information messages in the chatbox when starting a new game
// Called by displayFunBoard(), displayProBoard()
function startGameMessages(mode, userDisplayName, opponentName) {
  console.log(`This code is running - startGameMessages()`);
  let chatHTML, chatHTML2;
  if (mode === "fun") {
    chatHTML = `<p class='chatbox_entry_c'>Starting a fun mode game.</p>`;
  } else if (mode === "pro") {
    chatHTML = `<p class='chatbox_entry_c'>Starting a professional mode game.</p>`;
  }
  const displayName = getUserDisplayName();
  chatHTML2 = `<p class='chatbox_entry_d'><strong>${displayName}</strong> playing against <strong>${opponentName}!</strong></p>`;
  addGameNotification(chatHTML);
  addGameNotification(chatHTML2);
}

// TODO - CAN BE USED FOR DISPLAYING DICE ROLLS ETC. AS WELL
// Allows a game start notification to be added to the chatbox
// Called by startGameMessages()
function addGameNotification(HTML) {
  chatBoxDisplay.insertAdjacentHTML("beforeend", HTML);
}

function addChatNotification() {
  console.log("This code is running - ADD CHAT NOTIFICATION");
  console.log(chatNotification);
  if (chatNotification.classList.contains("hidden")) {
    return;
  } else {
    let chatNumber = Number(chatNotification.textContent);
    console.log(chatNumber);
    chatNumber++;
    chatNotification.textContent = String(chatNumber);
    console.log(chatNotification.textContent);
    chatPop.play();
    return;
  }
}

function clearChatNotification() {
  chatNotification.textContent = 0;
  chatNotification.classList.add("hidden");
}

function populatePlayers(playerList, section) {
  const newPlayerList = playerList.toSorted().reverse();
  console.log(section);
  let HTML;
  newPlayerList.forEach((player) => {
    const specificClass = "player_is_" + player;
    if (section === playersFriends) {
      if (userFriends.includes(player)) {
        checkPlayerOnline(player, playersOnline)
          ? (() => {
              checkPlayerInGame(player, playersInGame)
                ? (HTML = `<div class='player_online_display not_free'><p class='is_player_active player_ingame'></p><p class='player_text ${specificClass}'>${player}</p></div>`)
                : (HTML = `<div class='player_online_display'><p class='is_player_active'></p><p class='player_text ${specificClass}'>${player}</p></div>`);
            })()
          : (HTML = `<div class='player_online_display no_pointer_events'><p class='is_player_active player_offline'></p><p class='player_text ${specificClass}'>${player}</p></div>`);
        section.insertAdjacentHTML("afterbegin", HTML);
      }
    } else if (section === playersPlayedBefore) {
      if (userPlayedBefore.includes(player)) {
        checkPlayerOnline(player, playersOnline)
          ? (() => {
              checkPlayerInGame(player, playersInGame)
                ? (HTML = `<div class='player_online_display not_free'><p class='is_player_active player_ingame'></p><p class='player_text ${specificClass}'>${player}</p></div>`)
                : (HTML = `<div class='player_online_display'><p class='is_player_active'></p><p class='player_text ${specificClass}'>${player}</p></div>`);
            })()
          : (HTML = `<div class='player_online_display no_pointer_events'><p class='is_player_active player_offline'></p><p class='player_text ${specificClass}'>${player}</p></div>`);
        section.insertAdjacentHTML("afterbegin", HTML);
      }
    } else if (section === playersCurrentlyActive) {
      if (checkPlayerOnline(player, playersOnline)) {
        (() => {
          checkPlayerInGame(player, playersInGame)
            ? (HTML = `<div class='player_online_display not_free'><p class='is_player_active player_ingame'></p><p class='player_text ${specificClass}'>${player}</p></div>`)
            : (HTML = `<div class='player_online_display'><p class='is_player_active'></p><p class='player_text ${specificClass}'>${player}</p></div>`);
        })();
        section.insertAdjacentHTML("afterbegin", HTML);
      }
    }
  });
  addPlayerEventListeners(playerList);
  sortPlayerDisplay(section);
}

function checkPlayerOnline(player, playersOnline) {
  if (playersOnline.includes(player)) {
    console.log(`playersOnline includes ${player}!`);
    return true;
  } else {
    return false;
  }
}

function checkPlayerInGame(player, playersInGame) {
  if (playersInGame.includes(player)) {
    console.log(`playersInGame includes ${player}!`);
    return true;
  } else {
    return false;
  }
}

function sortPlayerDisplay(element) {
  const container = element;
  console.log(container);
  const playersArray = Array.from(container.children);

  playersArray.sort((a, b) => {
    const firstChildA = a.firstElementChild;
    const firstChildB = b.firstElementChild;
    const classA = firstChildA
      ? firstChildA.classList.contains("player_ingame")
        ? 1
        : firstChildA.classList.contains("player_offline")
        ? 2
        : 0
      : 0;
    const classB = firstChildB
      ? firstChildB.classList.contains("player_ingame")
        ? 1
        : firstChildB.classList.contains("player_offline")
        ? 2
        : 0
      : 0;

    return classA - classB;
  });

  playersArray.forEach((child) => element.appendChild(child));
}

function addPlayerEventListeners(playerList) {
  playerList.forEach((player) => {
    console.log(player);
    const element = ".player_is_" + player;
    console.log(element);
    const DOMElement = document.querySelectorAll(element);
    console.log(DOMElement);
    DOMElement.forEach((current) => {
      current.addEventListener("click", () => {
        displayPlayerName(player);
      });
    });
  });
}

// TODO
// MAKE THIS FUNCTION CHANGE THE PLAYER SELECTION DIALOGUE BOX WHEN READY
function displayPlayerName(playerName) {
  playButton.textContent = playerName;
}

function toggleOnlinePlayersOnly() {
  console.log(`This code is running - TOGGLEONLINEPLAYERSONLY`);
  const container = playersFriends;
  const playersArray = Array.from(container.children);
  const container2 = playersPlayedBefore;
  const playersArray2 = Array.from(container2.children);
  const playersArrays = [playersArray, playersArray2];
  if (!toggleOnlineOnlyFlag) {
    removeOfflinePlayers(playersArrays);
    toggleOnlineOnlyFlag = true;
  } else {
    addOfflinePlayers(playersArrays);
    toggleOnlineOnlyFlag = false;
  }
}

function removeOfflinePlayers(playersArrays) {
  playersArrays.forEach((array) => {
    array.forEach((current) => {
      if (current.classList.contains("no_pointer_events")) {
        current.classList.add("removed");
      }
    });
  });
}

function addOfflinePlayers(playersArrays) {
  playersArrays.forEach((array) => {
    array.forEach((current) => {
      if (
        current.classList.contains("removed") &&
        current.classList.contains("no_pointer_events")
      ) {
        current.classList.remove("removed");
      }
    });
  });
}

function toggleFreePlayersOnly() {
  console.log(`This code is running - TOGGLEFREEPLAYERSONLY`);
  const container = playersFriends;
  const playersArray = Array.from(container.children);
  const container2 = playersPlayedBefore;
  const playersArray2 = Array.from(container2.children);
  const container3 = playersCurrentlyActive;
  const playersArray3 = Array.from(container3.children);
  const playersArrays = [playersArray, playersArray2, playersArray3];
  if (!toggleFreeOnlyFlag) {
    removeInGamePlayers(playersArrays);
    toggleFreeOnlyFlag = true;
  } else {
    addInGamePlayers(playersArrays);
    toggleFreeOnlyFlag = false;
  }
}

function removeInGamePlayers(playersArrays) {
  playersArrays.forEach((array) => {
    array.forEach((current) => {
      if (current.classList.contains("not_free")) {
        current.classList.add("removed");
      }
    });
  });
}

function addInGamePlayers(playersArrays) {
  playersArrays.forEach((array) => {
    array.forEach((current) => {
      if (
        current.classList.contains("removed") &&
        current.classList.contains("not_free")
      ) {
        current.classList.remove("removed");
      }
    });
  });
}

function populateOtherGames(otherGamesHTML) {
  if (otherGamesPopulatedFlag === false) {
    let fullHTML = "";
    otherGamesHTML.forEach((current) => {
      fullHTML += current;
    });
    otherGamesDisplay.insertAdjacentHTML("beforeend", fullHTML);
    otherGamesBackgammonButton = document.querySelector(
      ".game_button_backgammon"
    );
    otherGamesMurderMansionButton = document.querySelector(
      ".game_button_murder_mansion"
    );
  }
}

let otherGamesBackgammonButton;
let otherGamesMurderMansionButton;

function addCurrentGameClass(currentGameFlag) {
  if (otherGamesPopulatedFlag === false) {
    switch (currentGameFlag) {
      case "Backgammon":
        toggleClass(otherGamesBackgammonButton, "game_button_current");
        break;
      case "Murder Mansion":
        toggleClass(otherGamesMurderMansionButton, "game_button_current");
        break;
    }
  }
}

function userLogin(usernameValue, passwordValue) {
  console.log(`USERNAME VALUE: ${usernameValue}`);
  console.log(`PASSWORD VALUE: ${passwordValue}`);
  const userObject = playersObjectArr.find(
    (current) => current.username === usernameValue
  );
  console.log(userObject);

  if (userObject) {
    if (userObject.password === passwordValue) {
      console.log(`Password is correct!`);
      loginInfoDisplay.textContent = `Welcome ${userObject.displayName}!`;
      setTimeout(() => {
        clearLoginInputFields();
        toggleClass(loginSection, "hidden");
        setTimeout(() => {
          toggleClass(loginSection, "no_pointer_events");
          toggleClass(floatingButtonsRight, "no_pointer_events");
          toggleClass(floatingButtonsLeft, "no_pointer_events");
          toggleClass(loginSection, "removed");
          addPlayerDetails(1, userObject);
        }, 60);
      }, 1000);
    } else {
      console.log(`Password is not correct!`);
      loginInfoDisplay.textContent = `That password is not correct.`;
      setTimeout(() => {
        clearLoginInputFields();
        loginInfoDisplay.textContent = `Please enter your details to log in.`;
      }, 2000);
    }
  } else {
    console.log(`User not found!`);
    loginInfoDisplay.textContent = `User not found!`;
  }
}

function addPlayerDetails(player, userObject) {
  if (player === 1) {
    player1Name.textContent = userObject.displayName;
    player1Portait.src = userObject.playerPortrait;
    player1Portait.style.backgroundColor = userObject.portraitColour;
    player1Rating.textContent = userObject.playerRating;
  }
}

function clearLoginInputFields() {
  loginUsernameField.value = "";
  loginPasswordField.value = "";
}

function userSignup(usernameValue, passwordValue) {
  console.log(`USERNAME VALUE: ${usernameValue}`);
  console.log(`PASSWORD VALUE: ${passwordValue}`);

  const userObject = playersObjectArr.find(
    (current) => current.username === usernameValue
  );
  console.log(userObject);

  if (userObject) {
    console.log(`That username ${usernameValue} is already taken.`);
    signupInfoDisplay.textContent = `That username '${usernameValue}' is already taken.`;
    setTimeout(() => {
      signupInfoDisplay.textContent = `Please enter both a username and password.`;
      clearSignupInputFields();
    }, 2000);
  } else {
    const newUserObject = {
      username: usernameValue,
      password: passwordValue,
      displayName: usernameValue,
      playerPortrait: "img/portrait_male.png",
      portraitColour: "#FFFFFF",
      playerRating: 0,
      member: false,
      languages: ["english"],
      friends: userFriends,
    };
    playersObjectArr.push(newUserObject);
    signupInfoDisplay.textContent = `Welcome ${newUserObject.displayName}!`;
    setTimeout(() => {
      clearSignupInputFields();
      toggleClass(loginSection, "hidden");
      toggleClass(signupSection, "hidden");
      setTimeout(() => {
        toggleClass(loginSection, "no_pointer_events");
        toggleClass(signupSection, "no_pointer_events");
        toggleClass(floatingButtonsRight, "no_pointer_events");
        toggleClass(floatingButtonsLeft, "no_pointer_events");
        toggleClass(loginSection, "removed");
        toggleClass(signupSection, "removed");
        addPlayerDetails(1, newUserObject);
      }, 60);
    }, 1000);
  }
}

function clearSignupInputFields() {
  signupUsernameField.value = "";
  signupPasswordField.value = "";
}

// COOKIE FUNCTIONS

// Checks if a particular cookie already exists and either parses its values if existing, or shows the cookies permission bar if it does not yet exist
// Called by an eventHandler linked to the loading of the window
function cookieCheck(cookieName) {
  console.log(`Cookie check is running!`);
  const cookie = document.cookie
    .split(";")
    .find((row) => row.startsWith(`${cookieName}=`));
  if (cookie) {
    console.log(`COOKIE - RUNNING`);
    [userIP, userDisplayName] = readCookie(cookieName);
    console.log(`COOKIE - ${userIP}`);
    console.log(`COOKIE - ${userDisplayName}`);
    console.log(`User has previously enabled cookies!`);
  } else {
    showCookieBar();
    const displayName = getUserDisplayName();
    const chatHTML = `<p class='chatbox_entry_c disposable_message'>Welcome <strong>${displayName}!</strong></p>`;
    postChatMessage(chatHTML, "afterbegin");
    nameIsGuest = true;
  }
}

function initializeCookie(tag = "") {
  setUpUserData();
  setTimeout(() => {
    if (tag !== "guest") {
      addDisplayName();
    }
    console.log(`userObject: `, userObject);
  }, 1000);
}

// Fetches the user's IP address and assigns it to the userObject object for use in the rest of the program
// Called by initializeCookie()
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
// Called initializeCookie()
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

// Allows the 'userDetails' cookie to be created and then read all at once by introducing a time delay, this happens the first time the cookie is created so its values are instantly available to the program
// Called by an eventHandler on the 'Accept Cookies' button
function setCookieUserDetails() {
  initializeCookie();
  setTimeout(() => {
    acceptCookies();
  }, 1100);
}

// Facilitates the creation of the 'userDetails' cookie and assigns its data to variables
// Called by setCookieUserDetails()
function acceptCookies() {
  console.log(`Cookies enabled!`);
  const cookieValues = createCookieValuesUserDetails();
  createCookie("userDetails", cookieValues, 1);
  [userIP, userDisplayName] = readCookie("userDetails");
  console.log(`COOKIE - ${userIP}`);
  console.log(`COOKIE - ${userDisplayName}`);
  ipTest(); // TEST FUNCTION - COULD BE REMOVED
  hideCookieBar();
}

// Assigns values from the userObject to the cookie 'userDetails'
// Called by acceptCookies()
function createCookieValuesUserDetails() {
  const cookieValues = {
    userIP: userObject.ip,
    userDisplayName: userObject.displayName,
  };

  const cookieString = JSON.stringify(cookieValues);
  return cookieString;
}

// Creates a cookie from a supplied name, data, and lifespan in days - should be fully configurable for other usecases
// Called by acceptCookies()
function createCookie(name, values, lifespan) {
  let expires = "";
  if (lifespan) {
    let date = new Date();
    date.setTime(date.getTime() + lifespan * 1000 * 60 * 60 * 24);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + values + expires + "; path=/";
}

// Cookie creation etc. has to run after the user object has been successfully created with the initializeCookie processes

// Finds if a cookie exists based on the supplied name then retrieves
function readCookie(cookieName) {
  let userIP,
    userDisplayName = "";
  console.log(`Cookie string: ${JSON.stringify(document.cookie)}`);
  const retrievedValues = retrieveCookieValues(cookieName);
  if (retrievedValues) {
    userIP = retrievedValues.userIP;
    userDisplayName = retrievedValues.userDisplayName;
    deleteGuestMessage();
    const chatHTML = `<p class='chatbox_entry_c disposable_message'>Welcome <strong>${userDisplayName}!</strong></p>`;
    postChatMessage(chatHTML);
    if (nameIsGuest) {
      nameChangeCheck("Guest", userDisplayName);
      nameIsGuest = false;
    }
    console.log(`FROM COOKIE: User IP: ${userIP}`);
    console.log(`FROM COOKIE: User Display Name: ${userDisplayName}`);
  } else {
    console.log(`FROM COOKIE: Cookie not found or invalid.`);
  }
  return [userIP, userDisplayName];
}

function deleteGuestMessage() {
  const firstMessage = document.querySelector(".disposable_message");

  if (firstMessage) {
    firstMessage.remove();
  }
}

// Parses the values from inside a particular cookie based on the supplied name
// Called by readCookie()
function retrieveCookieValues(cookieName) {
  const cookie = document.cookie
    .split(";")
    .find((row) => row.startsWith(`${cookieName}=`));

  if (cookie) {
    const cookieValueString = cookie.split("=")[1];
    try {
      const parsedValues = JSON.parse(cookieValueString);
      return parsedValues;
    } catch (error) {
      console.error(`Error parsing cookie values: ${error}`);
      return null;
    }
  } else {
    return null;
  }
}

// Causes the cookies permission bar to be displayed on the webpage
// Called by cookieCheck()
function showCookieBar() {
  cookieBar.classList.add("show_cookie_permission_bar");
}

// Causes the cookies permission bar to be removed from the webpage
// Called by acceptCookies(), rejectCookies()
function hideCookieBar() {
  cookieBar.classList.remove("show_cookie_permission_bar");
}

// Deletes the cookie by setting its expiry date to UTC time 0
// Called by an eventHandler on the 'Clear Cookie - TEST' button
function clearCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  console.log(`Cookie: ${cookieName} deleted!`);
}

// Hides the cookie permission bar in the case of a useer clicking the 'Reject Cookies' button
// Called by an eventHandler on the 'Reject Cookies' button
function rejectCookies() {
  console.log("Cookies disabled!");
  hideCookieBar();
}

function nameChangeCheck(oldName, newName) {
  if (newName !== oldName) {
    const message = `<strong>${oldName}</strong> changed their name to <strong>${newName}</strong></>`;
    const changeNameHTML = createChatMessage(message);
    postChatMessage(changeNameHTML);
    return;
  } else {
    return;
  }
}

// Tests to see if the userObject properties are available after assignment during set up - PASS
// Called automatically
function ipTest() {
  setTimeout(() => {
    console.log(`userObject.displayName: `, userObject.displayName);
    console.log(`userObject.ip: `, userObject.ip);
  }, 5000);
}

// Experimental function to reset the gamestart_block element and the image displayed in the gamebox, will later be assimilated into the page as a game reset type button
// Called by an eventHandler on the 'Toggle Game - TEST' button
function resetGame() {
  gamestartBox.style.display = "grid";
  greyOverlay.style.display = "block";
  gameBoard.src = "img/backgammon.jpg";
}
