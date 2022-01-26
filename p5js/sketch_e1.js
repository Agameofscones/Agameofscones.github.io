//Cubeleak, an exercise for class by Gwydion W. H. Brain.
//Colors, with love, from poolors.com
//inspired by the works of Tyler Hobbs, Peter Beyls, and Hiroshi Kawano

//The program runs automatically. Press SPACE to pause at any time.
//Press R to reset the canvas. This'll clear all cubes, but won't reset new colors!
//To reset colors, please refresh the page.
//Press RIGHT ARROW to speed up generation. LEFT ARROW to slow it down.
//Take care at faster speeds colors will flash RAPIDLY.
//EPILEPTIC USERS, EXERCISE CAUTION!

const colors = [];
const colorsDefault = [];
const newColors = [];

const oldCubeX = [];
const oldCubeY = [];
const oldCubeSizeX = [];
const oldCubeSizeY = [];
const oldCubeColor = [];
const oldCubeMode = [];

var globalTimer = 0;
var endTimer = 0;
var endTimerMax = 450;
var globalTimerMax = 40;
var lastColor;
var currentColor;

var visualMode = 0;//defines, 0-2 how our program runs

var programStop = false;
var hardStop = false;


function setup() {
  //createCanvas(windowWidth, windowHeight);
  var canvas = createCanvas(800, 800);
  canvas.style('display','block');
  //build basic color array
  let c0 = color(250, 248, 249);//offwhite
  let c1 = color(203, 50, 45);//lightred
  let c2 = color(54, 20, 24);//darkred
  let c3 = color(116, 174, 190);//lightblue
  let c4 = color(42, 25, 85);//darkblue / purple
  colorsDefault.push(c0);
  colorsDefault.push(c1);
  colorsDefault.push(c2);
  colorsDefault.push(c3);
  colorsDefault.push(c4);
  resetColors();
  //console.log(colors.length);
  //build the 'new' color array

  let n0 = color(233, 223, 229);
  let n1 = color(211, 63, 24);
  let n2 = color(208, 80, 135);
  let n3 = color(123, 140, 168);
  let n4 = color(15, 12, 22);

  let n5 = color(4, 16, 16);
  let n6 = color(223, 146, 229);
  let n7 = color(186, 69, 164);
  let n8 = color(239, 81, 130);
  let n9 = color(153, 113, 117);

  newColors.push(n0);
  newColors.push(n1);
  newColors.push(n2);
  newColors.push(n3);
  newColors.push(n4);
  newColors.push(n5);
  newColors.push(n6);
  newColors.push(n7);
  newColors.push(n8);
  newColors.push(n9);

  background(colors[3]);
  currentColor = colors[3];
}

function draw() {
  if(!programStop){
    runGlobalTimer();
  }
}

function resetColors(){
  colors.length = 0;
  for(let i = 1; i < colorsDefault.length; i++){
    colors.push(colorsDefault[i]);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    programStop = !programStop;//pause the program with space bar
    if(programStop){
      console.log("board generation halted");
      console.log("there are " + oldCubeX.length + " rects loaded into memory.");
    } else if (!programStop){
      console.log("board generation resumed");
    }
  }
  if (keyCode === 39){
    if(globalTimerMax >= 1){//left and right arrows to increase or decrease 'generation' speed
      globalTimerMax += -5;
    }
  }
  if (keyCode === 37){
    globalTimerMax += 5;
  }
  if (keyCode === 38){
    if(visualMode < 3){
      visualMode += 1;
      console.log("visual mode updated to: " + visualMode + "\n see 174 - 186 for mode names.");
    }
  }
  if (keyCode === 40){
    if(visualMode > 0){
      visualMode -= 1;
      console.log("visual mode updated to: " + visualMode + "\n see 174 - 186 for mode names.");
      //placeTextToBoard();
    }
  }
  if (keyCode === 82){
    globalTimerMax = 40;
    oldCubeX.length = 0;
    oldCubeY.length = 0;
    oldCubeX.length = 0;
    oldCubeY.length = 0;
    oldCubeColor.length = 0;
    oldCubeMode.length = 0;
    visualMode = 0;
    resetColors();
    background(lastColor);
    hardStop = false;
    console.log("board and colors reset");
  }
}

function runGlobalTimer() {
  if(hardStop === true){
    placeTextToBoard();
    return;
  }
  if(oldCubeX.length > 3500){
    hardStop = true;
    console.log("for your computer's sake, generation has been halted. There are 3500 rects currently saved in RAM. Please refresh the page or press R to reset.");

    return;
  }
  globalTimer += 1;
  endTimer += 1;
  if(endTimer >= endTimerMax){
    endTimer = 0;
    console.log("introducing a new color to the board");
    let randomNewColor = random(newColors);
    colors.push(randomNewColor);
  }
  if(globalTimer >= globalTimerMax){
    lastColor = currentColor;
    let randColor = random(colors);
    if(randColor === currentColor){
      randColor = random(colors);
    }
    currentColor = randColor;
    //console.log(randColor);
    background(randColor);
    globalTimer = 0;
    placeCubeToGrid();
    let randChance = random(0,100);
    if(randChance < 7){
      placeCubeToGrid();
      placeCubeToGrid();
      placeCubeToGrid();
      placeCubeToGrid();
      placeCubeToGrid();
      placeCubeToGrid();
      placeCubeToGrid();
    } else if (randChance < 25){
      placeCubeToGrid();
      placeCubeToGrid();
    } else if (randChance > 50){
      placeCubeToGrid();
    }
    placeCubeToGrid();
    placeTextToBoard();
  }
}
function placeTextToBoard() {
  textSize(38);
  let modeAdj = "functional";
  switch(visualMode){
    case 0:
      modeAdj = "uniform"
      break;
    case 1:
      modeAdj = "dianoetic"//capable of, like or pertaining to thought
      break;
    case 2:
      modeAdj = "uniform umstroke"//circumference; edge
      break;
    case 3:
      modeAdj = "umstroke dianoetic"
      break;
  }
  if(hardStop){
    modeAdj = "mabble";
  }
  text(modeAdj, 20, 40);
  fill(currentColor);
}
function placeCubeToGrid() {
  let placementX = generateGridMark();
  let placementY = generateGridMark();
  let cubeSizeX = generateCubeSize();
  let cubeSizeY = generateCubeSize();

  //actually placing the cube after generating params
  switch(visualMode){
    case 0:
      fill(lastColor);
      noStroke();
      break;
    case 1:
      fill(lastColor);
      noStroke();
      break;
    case 2:
      noFill();
      stroke(lastColor);
      strokeWeight(3);
      break;
    case 3:
      noFill();
      stroke(lastColor);
      strokeWeight(3);
      break;
  }
  //fill(lastColor);

  //noStroke();
  rect(placementX,placementY,cubeSizeX,cubeSizeY);

  oldCubeX.push(placementX);//hmm today I will write an infinite memory alloc
  oldCubeY.push(placementY);
  oldCubeSizeX.push(cubeSizeX);
  oldCubeSizeY.push(cubeSizeY);
  oldCubeColor.push(lastColor);
  oldCubeMode.push(visualMode);


  placeOldCubes();
}
function placeOldCubes(){
  for(var i = 0; i < oldCubeX.length; i++){
    //fill(oldCubeColor[i]);
    switch(oldCubeMode[i]){
      case 0:
        fill(oldCubeColor[i]);
        noStroke();
        break;
      case 1:
        fill(oldCubeColor[i]);
        noStroke();
        break;
      case 2:
        fill(oldCubeColor[i]);
        stroke(oldCubeColor[i]);
        strokeWeight(3);
        noFill();
        break;
      case 3:
        fill(oldCubeColor[i]);
        stroke(oldCubeColor[i]);
        strokeWeight(3);
        noFill();
        break;
    }
    //noStroke();
    rect(oldCubeX[i],oldCubeY[i],oldCubeSizeX[i],oldCubeSizeY[i]);
  }
}
function generateGridMark(){
  let randomGridMark = 5 * int(random(4,120));
  switch(visualMode){
    case 0:
      randomGridMark = 20 * int(random(2,35));
      break;
    case 1:
      randomGridMark = 5 * int(random(4,120));
      break;
    case 2:
      randomGridMark = 20 * int(random(2,35));
      break;
    case 3:
      randomGridMark = 5 * int(random(4,120));
      break;
  }
  return randomGridMark;
}
function generateCubeSize(){
  let randomCubeSize = 2 * int(random(1,100));
  switch(visualMode){
    case 0:
      let uniformityChance = random(1,100);
      if(uniformityChance > 80){
        randomCubeSize = 20 * int(random(1,5));
      } else if (uniformityChance < 20) {
        randomCubeSize = 20 * int(random(2,2));
      } else {
        randomCubeSize = 20 * int(random(1,1));
      }
      break;
    case 1:
      randomCubeSize = 2 * int(random(1,100));
      break;
    case 2:
      let uniformityChance_umstroke = random(1,100);
      if(uniformityChance_umstroke > 80){
        randomCubeSize = 20 * int(random(1,5));
      } else if (uniformityChance_umstroke < 20) {
        randomCubeSize = 20 * int(random(2,2));
      } else {
        randomCubeSize = 20 * int(random(1,1));
      }
      break;
    case 3:
      randomCubeSize = 2 * int(random(1,100));
      break;
  }
  return randomCubeSize;
}