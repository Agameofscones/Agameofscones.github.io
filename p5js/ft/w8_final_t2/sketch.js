
var testFib;
var globalRotation = 1

function setup() {
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
  testFib = new fibo(1500,0,0);
  fib0 = new fibo(500,-width/3,0);
  fib1 = new fibo(500,width/3,0);
}

function draw() {
  globalRotation += .0005;
  background(0);
  testFib.draw();
  fib0.draw();
  fib1.draw();
}
