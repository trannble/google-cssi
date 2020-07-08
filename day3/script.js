/* global createCanvas, background, colorMode, HSB, noStroke, backgroundColor, color, fill, ellipse, text, stroke, line, width, height, mouseX, mouseY, rect */

// We'll use variables for most of our colors in this code-along.
let backgroundColor, color1, color2, textColor, globalBrightness;

globalBrightness = 100;

function setup() {
  // Canvas & color settings
  createCanvas(600, 600);
  colorMode(HSB, 360, 100, 100);
  noStroke();

  // When used with only one argument, the color mode is greyscale.
  // 0 is black and 100 is white.
  backgroundColor = color(95);
  textColor = color(20);
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.
  // When used with three arguments, the function takes, in this order:
  // HUE - 0 to 360 degrees on a color wheel - 0 is red, 120 is green and 240
  //       is blue.
  // SATURATION - 0 is no color (greyscale), and 100 is as bold as possible.
  // BRIGHTNESS - 0 is no light (black), and 100 is as bright as possible.

  // Suggested saturation,brightness settings:
  // 50, 100: pastel
  // 100,100: neon
  // 100, 50: bold
  // 80, 80: neutral
  color1 = color(225, 75, globalBrightness);
  color2 = color(100, 75, globalBrightness);
}

function draw() {
  background(backgroundColor);
  
  
  
  
  if (mouseX > width / 2 && mouseY<width/2) {
    fill(200,50,88)
    rect(width/2,0,width/2,height/2)
    console.log("top right")
  }
  else if(mouseX<width/2 && mouseY>width/2)
    {
      fill(122,44,222)
      rect(0,height/2,width/2,height/2)
      console.log("bottom left")
    }
  else if(mouseX>width/2 && mouseY>width/2)
    {
      fill(0,100,100)
      rect(width/2,height/2,width/2,height/2)
      console.log("bottom right")
  }
  else
    {
      fill(175,100,100)
      rect(0,0,width/2,height/2)
      console.log("top left")
    }

  // Call the drawCenterLine function here to run the three lines of code
  // contained in that function.
  drawCenterLine();
  drawEquator();

  // The red and blue circles:
  fill(color1);
  ellipse((1 / 4) * width, height / 2, 50);
  fill(color2);
  ellipse((3 / 4) * width, height / 2, 50);

  // The grey circle and the text:
  fill(textColor);
  ellipse(mouseX, mouseY, 50);
  text("Flip the switch", 20, 20);
  
  
}

function drawCenterLine() {
  // This function will turn stroke on, draw the line, and then turn stroke
  // back off.
  // Remember a line segment in p5.js has four arguments: x1, y1, x2, y2
  stroke(textColor);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function drawEquator(){
  stroke(textColor);
  line(0, height/2, width, height/2)
  noStroke();
}


function nightMode(globalBrightness) {
  backgroundColor = color(20);
  textColor = color(95);
  color1 = color(100, 75, globalBrightness);
  color2 = color(225, 75, globalBrightness);
}

function dayMode(globalBrightness) {
  backgroundColor = color(95);
  textColor = color(20);
  color1 = color(225, 75, globalBrightness);
  color2 = color(100, 75, globalBrightness);
}
