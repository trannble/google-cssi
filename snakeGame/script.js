/* global loop, noLoop, frameRate, noFill, round, windowWidth, windowHeight, keyCode, keyIsDown, keyIsPressed, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideRectRect, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let backgroundColor, playerSnake, currentApple, score;

function setup() {
  // Canvas & color settings
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  frameRate(12);
  playerSnake = new Snake();
  currentApple = new Apple();
  score = 0;
}

function draw() {
  background(backgroundColor);
  // The snake performs the following four methods:
  playerSnake.moveSelf();
  playerSnake.showSelf();
  playerSnake.checkCollisions();
  playerSnake.checkApples();
  // The apple needs fewer methods to show up on screen.
  currentApple.showSelf();
  // We put the score in its own function for readability.
  displayScore();
}

function displayScore() {
  fill(0);
  text(`Score: ${score}`, 20, 20);
}

class Snake {
  constructor() {
    this.size = 10;
    this.x = width / 2;
    this.y = height - 10;
    this.direction = "N";
    this.speed = 12;
    this.tail = [new TailSegment(this.x, this.y)]; //encapsulates related vars together instead of global
    //starts with the head = one tail segment
  }

  moveSelf() {
    if (this.direction === "N") {
      this.y -= this.speed;
    } else if (this.direction === "S") {
      this.y += this.speed;
    } else if (this.direction === "E") {
      this.x += this.speed;
    } else if (this.direction === "W") {
      this.x -= this.speed;
    } else {
      console.log("Error: invalid direction");
    }

    //move the tail

    //put the head's current position in one end of array
    //create a tailSegment where the head is, put it in the array
    // let newTailSegment = new TailSegment(this.x, this.y);
    // this.tail.push(newTailSegment);
    this.extendTail();

    //remove the last item from other end of array
    this.tail.shift();
  }

  showSelf() {
    //  show each tail segment
    for (let i = 0; i < this.tail.length; i++) {
      this.tail[i].showSelf();
    }
  }

  checkApples() {
    // If the head of the snake collides with the apple...
    if (
      collideRectRect(
        this.x,
        this.y,
        this.size,
        this.size,
        currentApple.x,
        currentApple.y,
        currentApple.size,
        currentApple.size
      )
    ) {
      // Make a new apple, increment the score, and extend the tail.
      score += 1;
      currentApple = new Apple();
      this.extendTail();
    }
  }

  checkCollisions() {
    //check if first item of array (current head) is same as any other tail positions
    //check everything except the head itself (bc the head @ last element of array = the tail)
    for (let i = 0; i < this.tail.length - 1; i++) {
      if (this.tail[i].x === this.x && this.tail[i].y === this.y) {
        gameOver();
      }
    }
  }

  extendTail() {
    //create a new tail segment
    let newSegment = new TailSegment(this.x, this.y); //where head of snake WAS

    //add it to this.tail array
    this.tail.push(newSegment);
    console.log(this.tail);
  }
}

class TailSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 10;
  }

  showSelf() {
    fill(240, 100, 100);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Apple {
  constructor() {
    this.x = round(random(width - 10));
    this.y = round(random(height - 10));
    this.size = 10;
  }

  showSelf() {
    fill(0, 80, 80);
    rect(this.x, this.y, this.size, this.size);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && playerSnake.direction != "S") {
    playerSnake.direction = "N";
  } else if (keyCode === DOWN_ARROW && playerSnake.direction != "N") {
    playerSnake.direction = "S";
  } else if (keyCode === RIGHT_ARROW && playerSnake.direction != "W") {
    playerSnake.direction = "E";
  } else if (keyCode === LEFT_ARROW && playerSnake.direction != "E") {
    playerSnake.direction = "W";
  } else {
    console.log("wrong key");
  }
}

function restartGame() {
  //reset score
  score = 0;
  //reset snake
  playerSnake = new Snake();
  //restart animation loop
  loop();
  
}

function gameOver() {
  noLoop(); //stop looping the draw() fcn
  restartGame();
}
