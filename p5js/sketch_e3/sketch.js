//Lightbulbs with cable roots
//by Gwydion B. 2022

//color_seeding.js derivced from the work of RudgyG22 @ https://editor.p5js.org/RudyG22/sketches/rkCtpaI2Q
//be warned, ripe fermented code ahead.

// let curveStep = 50;
// let cableWidth = 10;
// let cablePieceAmt = 20;
var cableCols = [];
var cableColAmt = 19;
var lampOn = false;
// let rangle = 0;
var testCableCol;

var bkCols = [];
var bkColAmt = 3;

var freeBulbs = [];
var freeBulbAmt = 20;

function setup() {
  createCanvas(windowWidth, windowHeight,P2D);
  randomSeed(seed);
  colorMode(HSL);
  seed = random(413413415);
  seedColors();
  frameRate(5);
  cableColAmt = int(random(0,91));
  bkColAmt = int(random(4,16));
  freeBulbAmt = int(random(0,150));
  let weightedRNG = (random(99));

  //noLoop();
  for(let b = 0; b < freeBulbAmt; b++){
    let rScale = random(.5,1);
    let freeBulbert = new bulb(45,rScale,randomOffsetWidth(),randomOffsetHeight(),colors[3]);
    freeBulbert.setupBulb();
    freeBulbs.push(freeBulbert);
  }

  for(let i = 0; i < cableColAmt; i++){
    let littleBobbyCables = new cableCollection(20, randomOffsetWidth(), randomOffsetHeight(),2,true);
    littleBobbyCables.setupCables();
    littleBobbyCables.setupBulbs();
    cableCols.push(littleBobbyCables);
  }
  for(let j = 0; j < bkColAmt; j++){
    let rW = int(random(0,60));
    let rH = int(random(0,60));
    let rotato = new cableCollection(20, rW*j/2, rH,0,false);
    rotato.setupCables();
    rotato.setupBulbs();
    bkCols.push(rotato);
  }

  // testCableCol = new cableCollection(20, width/2, height/2);
  // testCableCol.setupCables();
  simMouseClicked(int(random(1,9)));
  noLoop();
}

// function windowResized() {
//   resizeCanvas(windowWidth,windowHeight);
// }

function getStepOffset(b) {
  let rSet = 0;
  if(b){
    rSet = random(-21,61);
  } else {
    rSet = random(-1,1  );
  }
  
  return rSet;
}
function randomOffsetWidth(){
  let rSet = random(20, width-100);
  return rSet;
}
function randomOffsetHeight(){
  let rSet = random(100, height-100);
  return rSet;
}

function drawCableArray(){
  for(let bk = 0; bk < bkCols.length; bk++){
    push();
    angleMode(degrees);
    translate(-width/35,height);
    rotate(-1.56777);
    bkCols[bk].drawCableCollection();
    bkCols[bk].drawBulbs();
    pop();
  }
  for(let i = 0; i< cableCols.length; i++){
    cableCols[i].drawCableCollection();
    cableCols[i].drawBulbs();
  }
  for(let b = 0; b < freeBulbs.length; b++){
    freeBulbs[b].refreshBulb();
  }
}

function mouseClicked(){
  for(let b = 0; b < freeBulbs.length; b++){
    freeBulbs[b].randomColor();
  }

  for(let j = 0; j < cableCols.length; j++){
    if(lampOn){
      cableCols[j].passColors(colors[0]);
      //bkCols[j].passColors(colors[0]);
    } else if (!lampOn){
      cableCols[j].passColors(colors[1]);
      //bkCols[j].passColors(colors[1]);
    }
  }
  lampOn = !lampOn;
}
function simMouseClicked(a){
  for(let i = 0; i < a; i++){
    mouseClicked();
  }
  //mouseClicked();
}

function draw() {
  if(lampOn){
    background(brights[1]);
  } else if (!lampOn){
    background(colors[1]);
  }
  strokeWeight(4);
  noFill();
  drawCableArray();
  strokeWeight(5);
  stroke("#000000");
  fill("#ffbc2b");
  // let t = map(mouseX, 0, width, -5, 5);
  // curveTightness(t);
}
