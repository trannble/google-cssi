/* global windowWidth, round, windowHeight, keyCode, keyIsDown, keyIsPressed, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, collideRectCircle, collideCircleCircle, random, mouseIsPressed, clear, textSize, createCanvas, strokeWeight, rect, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, sqrt */

let backgroundColor, spherePosition, rectPosition, mousePosition;

function setup() {
  // Canvas & color settings
  createCanvas(500, 400);
  colorMode(HSB, 360, 100, 100);
  backgroundColor = 95;
  // The spherePosition variable contains object, it is initialized using "Object Notation"
  spherePosition = {
    x: 100,
    y: 100
  };

  rectPosition = {
    x: 130,
    y: 140
  };

}

function draw() {
  background(backgroundColor);
  ellipse(spherePosition.x, spherePosition.y, 20, 20);
  rect(rectPosition.x, rectPosition.y, 20, 20);
  line(spherePosition.x, spherePosition.y, rectPosition.x, rectPosition.y);

  let distance = computeDistance(spherePosition, rectPosition);
  text(`The distance between the circle and rectangle is ${distance}`, 20, 20);

  // mouse position changes
  mousePosition = {
    x: mouseX,
    y: mouseY
  };

  // let distance2 = computeDistance(mousePosition, rectPosition);
  // text(`The distance between the mouse and rectangle is ${distance2}`, 20, 40);

  let distanceCategory = computeDistanceCategory(mousePosition, rectPosition);
  text(`You're ${distanceCategory}.`, 20, 40);
}

function mousePressed() {
  spherePosition.x = random(width);
  spherePosition.y = random(height);
}

function computeDistance(pointA, pointB) {
  let deltaX = pointA.x - pointB.x;
  let deltaY = pointB.x - pointB.y;

  let distance = sqrt(deltaX ** 2 + deltaY ** 2);
  return round(distance);
}

function computeDistanceCategory(pointA, pointB) {
  let distance = computeDistance(pointA, pointB);
  
  if (distance > 200) {
    backgroundColor = color (200, 10, 100);
    return "cold";
  } else if (distance > 50) {
    backgroundColor = color (120, 10, 100);
    return "warm";
  } else {
    backgroundColor = color (0, 10, 100);
    return "hot";
  }
}
