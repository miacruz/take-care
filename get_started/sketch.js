/* base code from Prof. Brian Bartz code library
 https://editor.p5js.org/bbartz/sketches/yaaL9I9ha
  help debugging from The Coding Train on YouTube (resetSketch) and chatGPT (one of each image is shown) */

var toDoDimensions = { x: 0, y: 0, w: 0, h: 0 }; 
var imgs = [];
var gameOver = false;
var numImgs = 3; 

var dress;
var rice;
var toothbrush;
var todolist;

function preload() {
  //load all images into variables
  dress = loadImage("dress.png");
  rice = loadImage("rice.png");
  toothbrush = loadImage("toothbrush.png");
  todolist = loadImage("todolist.png");
}

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  toDoDimensions.x = width / 2;
  toDoDimensions.y = height / 2;
  toDoDimensions.w = width * 0.6;
  toDoDimensions.h = height * 0.6;

  textSize(30);
  textFont("Nanum Gothic Coding");

  // put all three images on the canvas
  imgs.push(new ToDoImage(dress));
  imgs.push(new ToDoImage(rice));
  imgs.push(new ToDoImage(toothbrush));
  
}

function draw() {
  noStroke();
  background("#F2F2E9");

  imageMode(CENTER);

  // create todolist image on canvas
  image(todolist, toDoDimensions.x, toDoDimensions.y, toDoDimensions.w, toDoDimensions.h);

  // check if all checklist items are on the paper
  var allInside = true;

  for (var i = 0; i < imgs.length; i++) {
    if (!imgs[i].inside(toDoDimensions)) {
      allInside = false;
    }
  }

  if (allInside) {
    background(25, 150, 60, 200);
    textAlign(CENTER, CENTER);
    fill(255);
    text("Great job!", width / 2, height / 2);
  }

  // add images to canvas and update
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].display();
    imgs[i].update();
  }
}


//drag and drop function
function mousePressed() {
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    if (img.contains(mouseX, mouseY)) {
      img.dragging = true;
      img.offsetX = mouseX - img.x;
      img.offsetY = mouseY - img.y;
    }
  }
}

function mouseReleased() {
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].dragging = false;
  }
}

// ToDoImage class manages the three to-do list images
class ToDoImage {
  constructor(image) {
    this.x = random(width - 50);
    this.y = random(height - 50);
    this.w = 60;
    this.h = 60;
    this.dragging = false;
    this.image = image;
  }

  display() {
    image(this.image, this.x, this.y, this.w, this.h);
  }

  contains(px, py) {
    return (
      px > this.x - this.w / 2 &&
      px < this.x + this.w / 2 &&
      py > this.y - this.h / 2 &&
      py < this.y + this.h / 2
    );
  }

  update() {
    if (this.dragging) {
      this.x = mouseX - this.offsetX;
      this.y = mouseY - this.offsetY;
    }
  }

  inside(toDo) {
    return (
      this.x - this.w / 2 > toDo.x - toDo.w / 2 &&
      this.x + this.w / 2 < toDo.x + toDo.w / 2 &&
      this.y - this.h / 2 > toDo.y - toDo.h / 2 &&
      this.y + this.h / 2 < toDo.y + toDo.h / 2
    );
  }
}
