/* global createCanvas, random, setup, image, loadImage, key, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, mouseIsPressed, createSelect */

//Documentation for createSelect function: https://p5js.org/reference/#/p5/createSelect

// We'll use variables for most of our colors in this code-along.

// prev = give last coordinates of mouse
let brushHue,
  prevX,
  prevY,
  strokeW,
  imgLink,
  select,
  imgLinks,
  imgNames;

function setup() {
  // Canvas & color settings
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  strokeW = 5;

  prevX = 0;
  prevY = 0;

  background(95);
  
  //creates a drop down bar for selecting images
  select = createSelect();
  select.position(10, 10);
  // creates a list of image names from the imgLink object
  imgNames = Object.keys(imgLink);
  // loops through all the image names and creates an option for them in the dropdown
  for (let i = 0; i < imgNames.length; i++) {
    select.option(imgNames[i]);
  }
  // sets the initial image used
  select.selected(imgNames[0]);
  background(imgLink[imgNames[0]]);
  // onSelect function listens for changes in the dropdown
  select.changed(onSelect);
}

function draw() {
  strokeWeight(strokeW);
  chooseColors();

  //colors on mouse press
  if (mouseIsPressed) {
    line(prevX, prevY, mouseX, mouseY);
  }

  prevX = mouseX;
  prevY = mouseY;
}

function preload() {

  // all image links
  imgLink = {
    "girl": loadImage("https://cdn.glitch.com/925ddd74-5862-4fd1-a6c2-435386da911d%2FcoloringImage.png?v=1594330494857"),
    "graduation": loadImage("https://cdn.glitch.com/925ddd74-5862-4fd1-a6c2-435386da911d%2Fcoloringpage2.jpg?v=1594331465169"),
    "summer": loadImage("https://cdn.glitch.com/925ddd74-5862-4fd1-a6c2-435386da911d%2Fcoloring3.jpg?v=1594412740631"),
    "home": loadImage("https://cdn.glitch.com/925ddd74-5862-4fd1-a6c2-435386da911d%2Fcoloring4.jpg?v=1594412850484"),
    "space": loadImage("https://cdn.glitch.com/925ddd74-5862-4fd1-a6c2-435386da911d%2Fcoloring5.png?v=1594412851648")
  }

}

function keyPressed() {
  
  //clears the color on screen
  if (key == "c") {
    background(95);
    onSelect();
  }
  
  //keyboard controls colors
  chooseColors();

  //keyboard contols stroke width
  chooseStrokeW();
}

// allows user to choose stroke weight
function chooseStrokeW() {
  if (key == "1") {
    strokeW = 10;
  } else if (key == "2") {
    strokeW = 20;
  } else if (key == "3") {
    strokeW = 30;
  } else if (key == "4") {
    strokeW = 40;
  }
}

function chooseColors() {
  
  //selecting letters will change the brush color
  if (key == "r") { //red
    brushHue = 0;
  }
  else if (key == "o") { //orange
    brushHue = 30;
  }
  else if (key == "y") { //yellow
    brushHue = 60;
  }
  else if (key == "g") { //green
    brushHue = 120;
  }
  else if (key == "b") { //blue
    brushHue = 240;
  }
  else if (key == "p") { //purple
    brushHue = 300;
  }

  stroke(brushHue, 65, 80);
  fill(brushHue, 65, 80);
}

function onSelect() {
  // sets background color & image on select
  background(95);
  background(imgLink[select.value()]);
}