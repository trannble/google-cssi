// Content behind double slashes is a comment. Use it for plain English notes,
// or for code that you want to temporarily disable.

/* global createCanvas, background, circle, strokeWeight, stroke, noFill, rect, fill, color */

function setup() {
  // Code here runs only once
  createCanvas(800, 600);
}

function draw() {
  // Code here runs continuously
  background(255, 255, 255);
  
  // Olympic Logo
  strokeWeight(8);
  noFill();
  
  stroke(0, 133, 199);
  circle(100, 100, 100);
  
  stroke(244, 195, 0);
  circle(150, 150, 100);
  
  stroke(0, 0, 0);
  circle(220, 100, 100);
  
  stroke(0, 159, 61);
  circle(270, 150, 100);
  
  stroke(223, 0, 36);
  circle(340, 100, 100);
  
  //Red Cross Logo
  fill(220, 20, 60);
  rect(500, 100, 200, 55);
  rect(572, 25, 55, 200);
}
