/* global image, tint, width, height, createCanvas, background, ellipse, rect, strokeWeight, color, stroke, noFill, loadImage */

let dvdImage, x, y, random, xVelocity, yVelocity, logoWidth, logoHeight, r, g, b;

function setup() {
  r = 255;
  g = 255;
  b = 255;
  createCanvas(800, 600);
  
  //define var values in set up
  x = 50;
  xVelocity = 5;
  
  y = 50;
  yVelocity = 3;
  
  logoWidth = 200;
  logoHeight = 150;

  // We only want to load the logo once.
  dvdImage = loadImage("https://cdn.glitch.com/cac1122d-de8c-4087-86f0-262d9c687700%2Fdvd.jpeg?v=1594143991742"); //todo: get the image URL from the assets
}

function randomizeColor() {
  r = random(0, 256);
  g = random(0, 256);
  b = random(0, 256);
}

function draw() {
  background(220);
  
  x += xVelocity;
  y += yVelocity;
  
//   width & height is predefined of canvas
  if (x >= width - logoWidth || x <= 0) {
    randomizeColor()
    xVelocity *= -1;
  }
  
  if (y >= height - logoHeight || y <= 0) {
    randomizeColor()
    yVelocity *= -1;
  }

  tint(r, g, b);
  // Draw the logo at the new position. (x, y, w, h)
  image(dvdImage, x, y, logoWidth, logoHeight);
}


