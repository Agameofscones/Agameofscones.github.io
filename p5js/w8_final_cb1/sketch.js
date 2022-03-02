var perlinHills = [];
var testHill;
var totalHills = 5;

function setup() {
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB,360,100,100,100);
  bkColor = color(0,0,0,20);
  letterboxColor = color(255);
  angleMode(DEGREES);
  setupFibosManual();
  loadBanks();

  seedHillColors();
  seedColors();
  generatePerlinHills();
  testHill = new perlinHillObj(0,300,300,500,5444);
}

function generatePerlinHills(){
  for(let i = 0; i < totalHills; i++){
    perlinHills[i] = new perlinHillObj(height,(250 +(i * 50)),500,800);
    perlinHills[i].generatePerlinOffset();
    perlinHills[i].coolor = hillColors[i];
    perlinHills[i].setPerlinScroll(true);
  }
}

function drawPerlinHills(bool){
  for(let i = 0; i < perlinHills.length; i++){
    perlinHills[i].drawPerlinToHill();
  }
  if(bool){
    for(let h = 0; h < perlinHills.length; h++){
      perlinHills[h].doPerlinScroll();
    }
  }
}

function draw() {
  
  drawFibos();
  drawPerlinHills(false);
  background(bkColor);
  drawLetterBox();
  //handle bark time management
  globalTime = millis();
  globalTime = int(globalTime/1000);//convert to seconds from millis
  timeBarks();
}

//DEPRECATED FUNCTION, MOVED TO CLASS
// function perlinHill(base,offset,yscale,iscale,perlinOffset){
//   if(!perlinOffset){
//     perlinOffset = random(-41300,41300);//worble
//   }
//   beginShape();
//   vertex(0,base);
//   //noFill();
//   for(let i = 0; i < width; i++){
//     let yran = noise((i/iscale)+perlinOffset);
//     vertex(i,(yran*yscale)+(offset));
//   }
//   vertex(width,base);
//   endShape();
// }