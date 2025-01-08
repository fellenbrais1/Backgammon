//////////////////////////////////////////////////////////////////////////////////////////////////////
// START OF CODE

"use strict";

console.log(`Backgammon script`);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DOM ELEMENT SELECTION

const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const diceFace1 = document.querySelector(".dice1");
const diceFace2 = document.querySelector(".dice2");

//////////////////////////////////////////////////////////////////////////////////////////////////////
// EVENT HANDLERS

button1.addEventListener("click", rollOneDie);
button2.addEventListener("click", rollTwoDice);

//////////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES

const faces = 6;

//////////////////////////////////////////////////////////////////////////////////////////////////////
// FUNCTIONS

///////////////////////////////
// DICE ROLLERS

// Creates a random dice roll based on the specified number of die faces for the program (default: 6)
function diceRoller() {
  return Math.round(Math.random() * (faces - 1)) + 1;
}

// Simulates a one dice roll
// Called by eventHandler on 'button1'
function rollOneDie() {
  const target1 = diceFace1;
  rollingAnimation(target1);
  setTimeout(() => {
    const roll1 = diceRoller();
    console.log(roll1);
    cycleDieFaces(roll1, "set", target1);
  }, 2000);
}

// Simulates a two dice roll
// Called by eventHandler on 'button2'
function rollTwoDice() {
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
  }, 2000);
}

// Creates an animation of the dice faces cycling through their possibles, every 100 milliseconds for 2 seconds.
// Called by rollOneDice(), rollTwoDice()
function rollingAnimation(target) {
  let rollInterval = setInterval(() => {
    cycleDieFaces(null, "random", target);
  }, 100);
  setTimeout(() => {
    clearInterval(rollInterval);
  }, 2000);
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

// END OF CODE
//////////////////////////////////////////////////////////////////////////////////////////////////////
