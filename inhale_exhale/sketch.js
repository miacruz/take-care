/* base code from Prof. Brian Bartz code library
 https://editor.p5js.org/bbartz/sketches/gNotRzNki
  help debugging from The Coding Train on YouTube (resetSketch) and chatGPT (transition between timers) */

var currentState = 0; // checks which state we are in
var character; // character image variable
var speechbubble; // speech bubble image variable

var timerX; // timer X position
var timerY; // timer Y position

function preload(){
  character = loadImage("character.png");
  speechbubble = loadImage("speech-bubble.png");
}

function setup() {
  createCanvas(600, 600);
  
  timerX = (width/2) + 150;
  timerY = (height / 2) - 50;
  
  textAlign(CENTER, CENTER);
  textSize(30);
  imageMode(CENTER);
  // start the Breathe state
  currentState = 1;
  updatePhase();
  
  // create refresh button on canvas
  textFont("Nanum Gothic Coding");
}

function draw() {
  background("#F2F2E9");
  
  image(character, (width/2)-150, height/2, 200, 550);
  image(speechbubble, timerX-20, timerY, 450, 450);

  // displays the countdown timer in the middle of the canvas based on the current state
  if (currentState == 1) {
    text("Breathe: " + breatheTime, timerX, timerY);
  } else if (currentState == 2) {
    text("Hold: " + holdTime, timerX, timerY);
  } else if (currentState == 3) {
    text("Release: " + releaseTime, timerX, timerY);
  } else if (currentState == 4) {
    text("All done <3", timerX, timerY);
  }
}


//specific state timers
var breatheTime = 5;
var holdTime = 7;
var releaseTime = 8;

function updatePhase() {
  if (currentState == 1) {
    if (breatheTime > 0) {
      breatheTime--;
      setTimeout(updatePhase, 1000);
    } else {
      currentState = 2; // switch to Hold
      holdTime = 7;
      setTimeout(updatePhase, 1000);
    }
  } else if (currentState == 2) {
    if (holdTime > 0) {
      holdTime--;
      setTimeout(updatePhase, 1000);
    } else {
      currentState = 3; // switch to Release
      releaseTime = 8;
      setTimeout(updatePhase, 1000);
    }
  } else if (currentState == 3) {
    if (releaseTime > 0) {
      releaseTime--;
      setTimeout(updatePhase, 1000);
    } else {
      currentState = 4; // All states are completed
    }
  }
}

