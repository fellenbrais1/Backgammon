//////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CODE

"use strict";

console.log(`Backgammon script`);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENT SELECTION

const button1 = document.querySelector(".dice_button_roll1");
const button2 = document.querySelector(".dice_button_roll2");
const diceRollResult = document.querySelector(".dice_result_display");
const diceFace1 = document.querySelector(".dice_img1");
const diceFace2 = document.querySelector(".dice_img2");
const gameboxAd = document.querySelector(".gamebox_ad");

const diceRollSound = document.getElementById("dice_roll_sound");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT HANDLERS

button1.addEventListener("click", rollOneDie);
button2.addEventListener("click", rollTwoDice);

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

let adsDisabled = false;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

///////////////////////////////
// USER DATA SET UP

// This code below kind of works to extract a user's IP address using an API. It is asynchronous with all the tragedy that this involves. At the end it successfully stores the value of the users IP address to an object which can then be accessed outside of the functions, providing they have had time to run.

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
// DICE ROLLERS

// Functions relating to the dice rollers and their visual elements on the webpage

// Creates a random dice roll based on the specified number of die faces for the program (default: 6)
function diceRoller() {
  return Math.round(Math.random() * (faces - 1)) + 1;
}

// Simulates a one dice roll
// Called by eventHandler on 'button1'
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
// Called by eventHandler on 'button2'
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

// autoRun();

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EXPERIMENTAL CODE SNIPPETS

// Tests to see if the userObject properties are available after assignment during set up - PASS
// Called automatically
function ipTest() {
  setTimeout(() => {
    console.log(`userObject.displayName: `, userObject.displayName);
    console.log(`userObject.ip: `, userObject.ip);
  }, 5000);
}

// ipTest();

// Adding eventListeners etc. for testing toggleAds()
const adDisabler = document.querySelector(".toggle_ads_button");
adDisabler.addEventListener("click", toggleAds);

// Experimental function to toggle the visibility of ads displayed in front of the gamebox element
// Called by eventHandler on the 'Toggle ads' button
function toggleAds() {
  if (!adsDisabled) {
    console.log(`Disabling ads - toggleAds()`);
    gameboxAd.style.display = "none";
    adsDisabled = true;
    return;
  } else {
    console.log(`Enabling ads - toggleAds()`);
    gameboxAd.style.display = "block";
    adsDisabled = false;
    return;
  }
}

// END OF CODE
//////////////////////////////////////////////////////////////////////////////////////////////////////
