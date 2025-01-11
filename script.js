//////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CODE

"use strict";

console.log(`Backgammon script`);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENT SELECTION

const gameboxAd = document.querySelector(".gamebox_ad");

const gamestartBox = document.querySelector(".gamestart_block");
const buttonGamestartFun = document.querySelector(".gamestart_button_fun");
const buttonGamestartPro = document.querySelector(".gamestart_button_pro");
const greyOverlay = document.querySelector(".grey_overlay");

const gameBoard = document.querySelector(".board_img");

const chatboxDisplay = document.querySelector(".chatbox_display");
const chatboxInput = document.getElementById("chatbox_input");

const buttonRoll1 = document.querySelector(".dice_button_roll1");
const buttonRoll2 = document.querySelector(".dice_button_roll2");
const diceFace1 = document.querySelector(".dice_img1");
const diceFace2 = document.querySelector(".dice_img2");
const diceRollResult = document.querySelector(".dice_result_display");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// MEDIA: SOUNDS

const diceRollSound = document.getElementById("dice_roll_sound");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT HANDLERS

buttonGamestartFun.addEventListener("click", displayFunBoard);
buttonGamestartPro.addEventListener("click", displayProBoard);

chatboxInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addChatMessage();
  }
});

buttonRoll1.addEventListener("click", rollOneDie);
buttonRoll2.addEventListener("click", rollTwoDice);

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
let messageStyleToggle = false;

// Allows video ads to be disabled, for example in premium mode
let videoAdsDisabled = false;

// Counts the number of played games in order to display ads
let playedGames = 0;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

///////////////////////////////
// USER DATA SET UP

// This code works to extract a user's IP address using an API using an async/ await syntax. It stores the value of the users IP address to an object which can then be accessed by future functions

// TODO
// CONNECT THIS FUNCTION TO THE PAGE LOAD EVENT
// RENAME TO MAKE WHAT IT DOES CLEAR
// Starts the webpage code running on page load - not yet connected
// Invoked automatically
function autoRun() {
  setUpUserData();
  setTimeout(() => {
    addDisplayName();
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
// Called by fetchData()
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

// TODO
// NEEDS TESTING WITH DIFFERENT TIMINGS AND A MORE COMPLEX ENVIRONMENT, SLOWER OVER REAL INTERNET?
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

// TODO
// NEEDS TO BE OPTIONAL FOR THE USER IN FUTURE
// Allows a user to choose a display name via prompt
// Called by autoRun()
function addDisplayName() {
  userObject.displayName = prompt(
    `What would you like your display name to be?`
  );
  return;
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
  const messageClass = messageStyleToggle
    ? "chatbox_entry_a"
    : "chatbox_entry_b";
  const messageHTML = `<p class='${messageClass}'><strong>${userObject.displayName}</strong>: ${message} - ${timeStamp}</p>`;
  messageStyleToggle = messageStyleToggle ? false : true;
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
function postChatMessage(messageHTML) {
  chatboxDisplay.insertAdjacentHTML("beforeend", messageHTML);
  console.log(`Message content: ${messageHTML}`);
}

// Scrolls the chat box display down to the lcoation of the latest message - could be annoying when trying to look back through chats later? - UX?
// Called by addChatMessage()
function displayLatestMessage() {
  chatboxDisplay.scrollTop = chatboxDisplay.scrollHeight;
}

///////////////////////////////
// DICE ROLLERS

// Creates a random dice roll based on the specified number of die faces for the program (default: 6)
function diceRoller() {
  return Math.round(Math.random() * (faces - 1)) + 1;
}

// Simulates a one dice roll
// Called by an eventHandler on the 'ONe dice roll' button
function rollOneDie() {
  diceFace2.style.opacity = 0;
  diceRollSound.play();
  const target1 = diceFace1;
  rollingAnimation(target1);
  setTimeout(() => {
    const roll1 = diceRoller();
    console.log(`Roll 1: `, roll1);
    cycleDieFaces(roll1, "set", target1);
    diceRollResult.textContent = roll1;
  }, 1010);
}

// Simulates a two dice roll
// Called by an eventHandler on the 'Two dice roll' button
function rollTwoDice() {
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
  }, 1010);
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

///////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
// AUTO RUNNING CODE

///////////////////////////////
// CORE

autoRun();

///////////////////////////////
// EXPERIMENTAL

ipTest();
setInterval(imgAdCycler, 10000);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPERIMENTAL CODE SNIPPETS

///////////////////////////////
// TESTING USER IP CAPTURE

// Tests to see if the userObject properties are available after assignment during set up - PASS
// Called automatically
function ipTest() {
  setTimeout(() => {
    console.log(`userObject.displayName: `, userObject.displayName);
    console.log(`userObject.ip: `, userObject.ip);
  }, 5000);
}

///////////////////////////////
// TRIGGERING VIDEO AD DISPLAY

// Attaching playedGamesCount() to the 'board_img' element
gameBoard.addEventListener("click", playedGamesCount);

// Experimental function to count games played and can then enable ads when the count reaches a certain value
// Called by an eventHandler when clicking the 'board_img' element - later to be replaced with a call from games once they have been completed
function playedGamesCount() {
  playedGames++;
  console.log(`Games played: ${playedGames}`);
  if (playedGames === 3) {
    toggleAds();
    playedGames = 0;
    return;
  } else {
    return;
  }
}

///////////////////////////////
// TOGGLING VIDEO ADS

// Attaching toggleAds() to the 'Toggle_Ads - TEST' button
const adDisabler = document.querySelector(".toggle_ads_button");
adDisabler.addEventListener("click", toggleAds);

// Experimental function to toggle the visibility of ads displayed in front of the gamebox element, will eventually be leveraged as a way opf showing/ hiding ads
// Called by an eventHandler on the 'Toggle ads' button
function toggleAds() {
  if (!videoAdsDisabled) {
    console.log(`Disabling ads - toggleAds()`);
    gameboxAd.style.display = "none";
    videoAdsDisabled = true;
    return;
  } else {
    console.log(`Enabling ads - toggleAds()`);
    gameboxAd.style.display = "block";
    videoAdsDisabled = false;
    return;
  }
}

///////////////////////////////
// TOGGLING GAME OVERLAY

// Attaching resetGame() to the 'Toggle Game - TEST' button
const gameToggler = document.querySelector(".toggle_game_button");
gameToggler.addEventListener("click", resetGame);

// Experimental function to reset the gamestart_block element and the image displayed in the gamebox, will later be assimilated into the page as a game reset type button
// Called by an eventHandler on the 'Toggle game' button
function resetGame() {
  gamestartBox.style.display = "grid";
  greyOverlay.style.display = "block";
  gameBoard.src = "img/backgammon.jpg";
}

// Displays the fun game board - To be changed later to the fun game logic, can use the standard dice roller
// Called by an eventHandler on the 'Fun Game' button
function displayFunBoard() {
  gameBoard.src = "img/backgammon.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
}

// Displays the professional game board - To be changed later to the professional game logic, also needs to change the dice roller elements to a professional version
// Called by an eventHandler on the 'Professional Game' button
function displayProBoard() {
  gameBoard.src = "img/backgammonHard.jpg";
  gamestartBox.style.display = "none";
  greyOverlay.style.display = "none";
}

///////////////////////////////
// CYCLING THROUGH PICTURE ADS

// Consts to define details of image adverts - details could be populated from Google Ad Sense later?
const ad1 = {
  source: "img/cash4gold.jpg",
  altText: "Cash 4 Gold Advertisement",
  href: "https://www.cash4goldonline.co.uk/",
  title: "Cash 4 Gold Online",
};

const ad2 = {
  source: "img/kier.avif",
  altText: "Kier Starmer Advertismeent",
  href: "https://en.wikipedia.org/wiki/Keir_Starmer",
  title: "Kier Starmer Action Figures",
};

const ad3 = {
  source: "img/chocowhopper.webp",
  altText: "Burger King Advertisment",
  href: "https://youtube.com/watch?v=2JaCzLZTYAE",
  title: "The NEW Chocolate Whopper",
};

const ad4 = {
  source: "img/vizswan.jpg",
  altText: "Viz Swan Advertisment",
  href: "https://www.amazon.co.uk/Brainbox-Candy-Official-Advert-Birthday/dp/B0BMGXMB61",
  title: "Retrain as a Swan Today",
};

const ad5 = {
  source: "img/hokusaiNuke.jpeg",
  altText: "Japanese Nuclear Waste Advertisment",
  href: "https://www.globaltimes.cn/page/202104/1221726.shtml",
  title: "Japanese Nuclear Waste Near You!",
};

const ad6 = {
  source: "img/gizmo.jpg",
  altText: "Baby Gizmo Advertismement",
  href: "https://fastshow.fandom.com/wiki/Chanel_9_Neus",
  title: "Baby Gizmo Action Pumpo",
};

// Array to hold all of the image ads for cycling through
const adList = [ad1, ad2, ad3, ad4, ad5, ad6];

// Counter showing index of the currently displayed ad
let currentAdNumber = 0;

// Query selectors for image ad elements
const currentAdLink = document.querySelector(".test_ad_link");
const currentAdPicture = document.querySelector(".test_ad");

// Experimental function to cycle through the available ads using random numbers, changes properties of image ad elements on the page
// Called automatically on a 10 second interval
function imgAdCycler() {
  setTimeout(() => {
    const oldAdNumber = currentAdNumber;
    while (oldAdNumber === currentAdNumber) {
      currentAdNumber = Math.round(Math.random() * (adList.length - 1));
    }
    currentAdPicture.src = adList[currentAdNumber].source;
    currentAdPicture.title = adList[currentAdNumber].title;
    currentAdPicture.alt = adList[currentAdNumber].altText;
    currentAdLink.href = adList[currentAdNumber].href;
  }, 0);
}

///////////////////////////////

// CODE END
//////////////////////////////////////////////////////////////////////////////////////////////////////
