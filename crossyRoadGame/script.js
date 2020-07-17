/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, text, mouseX, mouseY, 
          strokeWeight, line,  mouseIsPressed, windowWidth, windowHeight, noStroke, keyIsDown, CONTROL
          frameRate, noFill, round, keyCode, loop, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, loadImage, image, keyIsPressed, key*/

// Collide2D functions:
/* global collideRectRect */

let backgroundColor,
  gameIsOver,
  pigImage,
  duckImage,
  carImage,
  truckImage,
  cars,
  trucks,
  pig1,
  duck1,
  score,
  lives,
  vehicles;

let characters = [];

function setup() {
  // Canvas & color settings
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 90;

  //loading the images
  pigImage = loadImage(
    "https://cdn.glitch.com/da45be52-0ec3-457f-8ac4-26254376b43f%2Fpig.png?v=1595018800481"
  );
  duckImage = loadImage(
    "https://cdn.glitch.com/da45be52-0ec3-457f-8ac4-26254376b43f%2Fduck.png?v=1595018848972"
  );

  carImage = loadImage(
    "https://cdn.glitch.com/da45be52-0ec3-457f-8ac4-26254376b43f%2Fkissclipart-toy-car-clipart-volkswagen-beetle-car-eb011e99863340a5.png?v=1595017685183"
  );

  truckImage = loadImage(
    "https://cdn.glitch.com/da45be52-0ec3-457f-8ac4-26254376b43f%2Funnamed.png?v=1595020568262"
  );

  //creating pig character
  pig1 = new Pig();
  characters.push(pig1);

  //creating duck character
  duck1 = new Duck();
  characters.push(duck1);

  gameIsOver = false;

  //creating 4 cars
  cars = [];
  for (let i = 0; i < 4; i++) {
    cars.push(new Car());
  }

  //creating 4 trucks
  trucks = [];
  for (let i = 0; i < 4; i++) {
    trucks.push(new Truck());
  }

  vehicles = [];
  for (let i = 0; i < 4; i++) {
    vehicles.push(cars[i]);
    vehicles.push(trucks[i]);
  }
}

function draw() {
  //drawing the background
  background(backgroundColor);
  fill(60, 80, 80);
  rect(0, 0, width, 50);
  fill(120, 80, 80);

  //displaying the pig
  pig1.display();
  pig1.move();
  pig1.checkEndWin();

  //displaying the duck
  duck1.display();
  duck1.move();
  duck1.checkEndWin();

  checkCollisions();
  checkVehicleCollisions();
  displayScores();

  //moving the cars
  for (let i = 0; i < cars.length; i++) {
    cars[i].move();
    cars[i].draw();
  }

  //moving the trucks
  for (let i = 0; i < trucks.length; i++) {
    trucks[i].move();
    trucks[i].draw();
  }
}

function checkVehicleCollisions() {
  //making sure the vehicles do not collide with each other
  for (let i = 0; i < cars.length; i++) {
    for (let j = 0; j < trucks.length; j++) {
      while (
        collideRectRect(
          cars[i].x,
          cars[i].y,
          50,
          30,
          trucks[j].x,
          trucks[j].y,
          50,
          30
        )
      ) {
        cars[i].x = 0;
        cars[i].y = random(100, 400);
        console.log("cars are not colliding");
      }
    }
  }
}

// rectOneRight > rectTwoLeft && rectOneLeft < rectTwoRight && rectOneBottom > rectTwoTop && rectOneTop < rectTwoBottom

//checking collisions between characters and vehicles
function checkCollisions() {
  for (let i = 0; i < vehicles.length; i++) {
    for (let j = 0; j < characters.length; j++) {
      if (
        // characters[i].x >= cars[i].x &&
        // characters[i].x <= cars[i].x + 50 &&
        // characters[i].y >= cars[i].y &&
        // characters[i].y <= cars[i].y + 30

        collideRectRect(
          characters[j].x,
          characters[j].y,
          30,
          30,
          vehicles[i].x,
          vehicles[i].y,
          50,
          30
        )
      ) {
        console.log(characters[j]);
        characters[j].y = height - 30;
        characters[j].lives--;
      }
    }
  }

  if (pig1.lives <= 0 || duck1.lives <= 0) {
    gameIsOver = true;
    for ( let i = 0; i < characters.length; i++) {
      characters[i].score = 0;
      characters[i].lives = 0;
    }
  }
}

function displayScores() {
  textSize(12);
  fill(0);

  // Display Lives
  text(`Pig Lives: ${pig1.lives}`, 10, 20);
  text(`Duck Lives: ${duck1.lives}`, 400, 20);

  // Display Score
  text(`Pig Score: ${pig1.score}`, 10, 38);
  text(`Duck Score: ${duck1.score}`, 400, 38);

  // Display game over message
  if (gameIsOver) {
    textSize(30);
    let winner = checkWin();
    console.log(winner);
    text(
      "Game over. " + winner + " won!",
      60,
      height / 2
    );
  }
}

//checking if the duck or pig wins
function checkWin() {
  if (pig1.score > duck1.score) {
    return "Pig";
  } else {
    return "Duck";
  }
}

class Character {
  //generic characteristics of all characters
  constructor() {
    this.x = random(100, 400);
    this.y = height - 30;
    this.score = 0;
    this.lives = 3;
  }

  //if character reaches end, reset position & increase score
  checkEndWin() {
    if (this.y <= 50) {
      this.score += 1;
      this.y = height - 30;
    }
  }
}

class Car {
  //generic characteristics of all cars
  constructor() {
    this.x = 0;
    this.y = random(50, height - 50);
    this.vX = random(1, 7);
  }

  draw() {
    image(carImage, this.x, this.y, 50, 30);
  }

  move() {
    this.x += this.vX;
    // and reset if it moves off screen
    if (this.x >= width) {
      this.x = -30;
    }
  }
}

class Truck {
  //generic characteristics of all trucks
  constructor() {
    // constructor(otherVehicles) []
    this.x = width;
    this.y = random(50, height - 50);
    this.vX = random(1, 5);
  }
  draw() {
    image(truckImage, this.x, this.y, 50, 30);
  }
  move() {
    this.x -= this.vX;
    if (this.x <= 0) {
      this.x = width;
    }
  }
}

// creates a new Duck from Character class
class Duck extends Character {
  constructor() {
    super();
    this.x = width*5/8;
    // this.x = (width * 3) / 4;
  }
  display() {
    image(duckImage, this.x, this.y, 30, 30);
  }

  //controlled using the arrow keys
  move() {
    if (keyIsPressed && keyCode === UP_ARROW) {
      this.y -= 10;
    } else if (keyIsPressed && keyCode === LEFT_ARROW) {
      this.x -= 10;
    } else if (keyIsPressed && keyCode === RIGHT_ARROW) {
      this.x += 10;
    } else if (keyIsPressed && keyCode === DOWN_ARROW) {
      this.y += 10;
    }
  }
}

// creates a new Pig from Character class
class Pig extends Character {
  constructor() {
    super(); // Calls the parent's constructor.
    this.x = width*3/8;
  }
  display() {
    image(pigImage, this.x, this.y, 30, 30);
  }

  //controlled using letter keys
  move() {
    if (keyIsPressed && key === "w") {
      this.y -= 10;
    } else if (keyIsPressed && key === "a") {
      this.x -= 10;
    } else if (keyIsPressed && key === "d") {
      this.x += 10;
    } else if (keyIsPressed && key === "s") {
      this.y += 10;
    }
  }
}
