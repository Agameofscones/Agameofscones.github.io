var testMuth;

function setup() {
  angleMode(DEGREES);//my brain is smol, unit circle hard
  createCanvas(windowWidth,windowHeight);
  testMuth = new bismuthSystem("A",1,90);
  for(let i = 0; i < testMuth.genMax; i++){
    testMuth.generate();
  }
}

function draw() {
  background(100);
  testMuth.turtleTut();
}

