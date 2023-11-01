/* base code from Prof. Brian Bartz code library
  https://editor.p5js.org/bbartz/sketches/fFCELqxTS
  help debugging from The Coding Train on YouTube (resetSketch) and chatGPT (collision checks with imageMode as CENTER) */

var phoneWidth = 40;
var phoneHeight = 60;
var characterSize = 80; // size of the character
var canvasWidth, canvasHeight; // width and height of the canvas
var characterX, characterY; // character position
var character; // character image variable
var phone; // phone image variable
var finishLine; // finish line image variable
var numObstacles = 20; // number of obstacles (phone) on canvas

// array storing position of obstacles
var obstacles = [];

function setup() {
  // load the images and set up the canvas
  character = loadImage("take_care_head.png");
  finishLine = loadImage("finishline.png");
  phone = loadImage("phone.png");
  canvasWidth = characterSize * 12; // Make the canvas width a multiple of characterSize
  canvasHeight = characterSize * 7; // Make the canvas height a multiple of characterSize
  createCanvas(canvasWidth, canvasHeight);
  characterX = characterSize - (characterSize / 2);
  characterY = canvasHeight - (characterSize / 2);

  // create random positions for phone and add to obstacles array
  for (var i = 0; i < numObstacles; i++) {
    var obstacleX = floor(random(canvasWidth / characterSize)) * characterSize;
    var obstacleY = floor(random(canvasHeight / characterSize)) * characterSize;
    obstacles.push({ x: obstacleX, y: obstacleY });
  }
  
  // create refresh button on canvas
  textFont("Nanum Gothic Coding");
  textSize(30);
}

function draw() {
  background("#F2F2E9");

  // create finish line on canvas
  imageMode(CENTER);
  image(finishLine, 827, 40, characterSize, characterSize);
  
  // show "you did it" if user reaches finish line
  if (dist(characterX, characterY, 827, 40) < 50) {
    text('You did it!', width / 2, height / 2);
  } else { 
  //draw phone obstacles
    imageMode(CORNER);
    for (var i = 0; i < obstacles.length; i++) {
      image(phone, obstacles[i].x, obstacles[i].y, phoneWidth, phoneHeight);
    }

    // check for collisions between character and obstacles
    var canMoveCharacter = true;
    for (var i = 0; i < obstacles.length; i++) {
      if (
        characterX + characterSize / 2 > obstacles[i].x &&
        characterX - characterSize / 2 < obstacles[i].x + characterSize &&
        characterY + characterSize / 2 > obstacles[i].y &&
        characterY - characterSize / 2 < obstacles[i].y + characterSize
      ) {
        canMoveCharacter = false;
        break;
      }
    }

    // create character on canvas
    imageMode(CENTER);
    image(character, characterX, characterY, characterSize, characterSize);
  }
}

function keyPressed() {
  var newX = characterX;
  var newY = characterY;

  // move the character based on arrow keys
  if (keyCode === LEFT_ARROW) {
    newX -= characterSize;
  } else if (keyCode === RIGHT_ARROW) {
    newX += characterSize;
  } else if (keyCode === UP_ARROW) {
    newY -= characterSize;
  } else if (keyCode === DOWN_ARROW) {
    newY += characterSize;
  }

  // check for collisions with obstacles
  var canMoveCharacter = true;
  for (var i = 0; i < obstacles.length; i++) {
    if (
      newX + characterSize / 2 > obstacles[i].x &&
      newX - characterSize / 2 < obstacles[i].x + characterSize &&
      newY + characterSize / 2 > obstacles[i].y &&
      newY - characterSize / 2 < obstacles[i].y + characterSize
    ) {
      canMoveCharacter = false;
      break;
    }
  }

  // update character position if there's no collision with obstacles
  if (canMoveCharacter) {
    characterX = newX;
    characterY = newY;
  }
}

