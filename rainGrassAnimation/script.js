/* global keyCode, triangle, image, loadImage, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY */

let grassX, raincount, drop;
let blades = [];
let raindrops = [];

function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 100);
  drop = loadImage(
    "https://cdn.glitch.com/544448ed-5a88-4bcf-bfc7-566c89ef7433%2Fraindrop.png?v=1594850539201"
  );

  for (let i = 0; i < random(8, 20); i++) {
    raindrops.push(new RainDrop());
  }

  grassX = 0;
  for (var i = 0; i < width; i += 20) {
    blades.push(new Grass(grassX));
    grassX += 50;
  }
}

function draw() {
  background(0, 0, 95);

  for (var j = 0; j < raindrops.length; j++) {
    raindrops[j].show();
    raindrops[j].fall();
  }

  for (var i = 0; i < blades.length; i++) {
    blades[i].show();
    blades[i].grow();
  }
}

class RainDrop {
  constructor() {
    this.x = random(width);
    this.y = random(0, 50);
    this.d = 10;
    this.height = 18.2;
    this.fallSpeed = random(2, 8);
  }

  show() {
    noStroke();
    fill(60, 80, 80);
    image(drop, this.x, this.y, this.d, 27.4);
  }

  fall() {
    this.y += this.fallSpeed;
    if (this.y > height) {
      this.y = 0;
      this.x = random(width);
    }
  }
}

class Grass {
  constructor(x1) {
    this.h = height - length;
    this.x1 = x1;
    this.y1 = height;
    this.y2 = random(height - 50, height - 10);
    this.x3 = random(x1 + 50, x1 + 100);
    this.y3 = height;

    this.x2 = (this.x3 + this.x1) / 2;
  }

  show() {
    noStroke();
    fill(20, 80, 80);
    triangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3);
  }

  grow() {
    if (this.y2 > 0) {
      this.y2 -= random(1, 5);
    } 
  }
}
