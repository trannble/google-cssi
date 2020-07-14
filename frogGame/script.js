/* global keyCode, key, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, frogX, frogY, frogV, score, lives, gameIsOver, car1X, car1Y, car1V, hit, car2X, car2Y, car2V, hit2, hit3, hit4, frog2X, frog2Y, frog2V;

function setup() {
  // Canvas & color settings
  createCanvas(500, 500); 
  colorMode(HSB, 360, 100, 100); 
  backgroundColor = 95; 
  score = 0;
  lives = 3;
  gameIsOver = false;
  
  car1X = 0;
  car1Y = 100;
  car1V = 7;
  
  car2X = 0;
  car2Y = 200;
  car2V = 5;
  
  setupFrog();
}

function setupFrog() {
  frogX = width/4;
  frogY = 450;
  frogV = 10;
  
  frog2X = 3 * width/4;
  frog2Y = 450;
  frog2V = 20;
}

function draw() {
  background(backgroundColor);
  // Code for gold goal line
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  // Code to display Frogs
  fill(120, 80, 80);
  ellipse(frogX, frogY, 20);
  fill(80, 80, 80);
  ellipse(frog2X, frog2Y, 20);
  // Code for river (two blocks)
  fill(200, 170, 80);
  rect(0, 300, width/3, 20);
  rect( width/2, 300, 2 * width/3, 20);
  fill(32, 100, 38)
  rect(width/3, 300, width/6, 20)
  
  moveCars();
  drawCars();
  checkCollisions();
  checkWin();
  displayScores();
}

function keyPressed() {
  if (gameIsOver) {
    return;
  }
  
  if (keyCode === UP_ARROW) {
    frog2Y -= frogV;
  } else if (keyCode === DOWN_ARROW) {
    frog2Y += frogV;
  } else if (keyCode === RIGHT_ARROW) {
    frog2X += frogV;
  } else if (keyCode === LEFT_ARROW) {
    frog2X -= frogV;
  } else if (key === "w") {
    frogY -= frog2V;
  } else if (key === "d") {
    frogX += frog2V;
  } else if (key === "a") {
    frogX -= frog2V;
  } else if (key === "s") {
    frogY += frog2V;
  }
}

function moveCars() {
  // Move the car
  car1X += car1V;
  car2X += car2V;
  // Reset if it moves off screen
  if (car1X > width) {
    car1X = -40;
  }
  
  if (car2X > width) {
    car2X = -40;
  }

}

function drawCars() {
  // Code for car 1
  fill(0, 80, 80);
  rect(car1X, car1Y, 40, 30);
  // Code for additional cars
  rect(car2X, car2Y, 40, 30);
}

function checkCollisions() {
  hit = collideRectCircle(car1X, car1Y, 40, 30, frogX, frogY, 20);
  hit2 = collideRectCircle(car2X, car2Y, 40, 30, frogX, frogY, 20);
  hit3 = collideRectCircle(0, 300, width/3, 20, frogX, frogY, 20);
  hit4 = collideRectCircle(width/2, 300, 2 * width/3, 20, frogX, frogY, 20);
  
  // If the frog collides with the car, reset the frog and subtract a life.
  if (hit || hit2 || hit3 || hit4) {
    setupFrog();
    lives--;
  }
  // if the frog has no more lives, game over
  if (lives === 0) {
    gameIsOver = true;
  }
}

function checkWin() {
  // If the frog makes it into the yellow gold zone, increment the score
  // and move the frog back down to the bottom.
  if (frogY < 50) {
    score++;
    console.log(score);
    setupFrog();
  }
}

function displayScores() {
  textSize(12);
  fill(0);
  // Display Lives
  text(`Lives: ${lives}`, 10, 20);
  // Display Score
  text(`Score: ${score}`, 10, 40);
  // Directions for key press
  text("Right Player: use arrow keys", 330, width - 10);
  text("Left Player: use AWSD keys", 10, width - 10);
  // Display game over message if the game is over
  if (gameIsOver) {
    textSize(42);
    text("GAME OVER!", width/4, height/2);
  }  
}
