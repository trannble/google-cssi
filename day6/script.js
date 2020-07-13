/* global collideCircleCircle, random, keyCode, hit2, mouseIsPressed, clear, createCanvas, textSize, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, coinX, coinY, coin2X, coin2Y, score, time, gameIsOver, hit;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  randomlyPlaceCoin();
  randomlyPlaceCoin2();
  time = 200;
  gameIsOver = false;
  score = 0;
}

function draw() {
  noStroke();
  background(backgroundColor);
  
  fill(20, 70, 100);
  ellipse(coinX, coinY, 20);
  
  fill(20, 150, 100);
  ellipse(coin2X, coin2Y, 30);
  
  fill(60, 70, 100)
  textSize(15);
  text("5", coin2X-5, coin2Y+5 );
  
  fill(160, 100, 100);
  ellipse(mouseX, mouseY, 20);
  
  fill(270, 90, 70);
  textSize(12);
  text(`Time remaining: ${time}`, 20, 40);
  text("Press Space Bar to Start Over", 20, 80);
  handleTime();
  handleCollision();
  text(`Score: ${score}`, 20, 60);

  //todo: game over screen
  if (gameIsOver) {
    textSize(50);
    text("Game over", width / 5, width / 2);
    textSize(12);
    }
}

function handleCollision() {
  // We'll write code for what happens if your character hits a coin.
  hit = collideCircleCircle(coinX, coinY, 20, mouseX, mouseY, 20);
  hit2 = collideCircleCircle(coin2X, coin2Y, 20, mouseX, mouseY, 20);

  if (!gameIsOver && hit) {
    randomlyPlaceCoin();
    score++;
  }
  if (!gameIsOver && hit2) {
    randomlyPlaceCoin2();
    score+=5;
  }
}

function handleTime() {
  // We'll write code to handle the time.
  if (time > 0) {
    time--;
  } else {
    gameIsOver = true;
    time = 0;
  }
}  

function randomlyPlaceCoin() {
  coinX = random(width);
  coinY = random(height);
}

function randomlyPlaceCoin2() {
  coin2X = random(width);
  coin2Y = random(height);
}

function keyPressed() {
  if (keyCode === 32) {
    gameIsOver = false;
    score=0;
    time=200;
  }
  return false;       
}