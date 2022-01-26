//following coding train tutorial
var axiom = "A";
var sentence = axiom;
var len = 55;
var genMax = 4;
var angle;
var rotationSpeed = .1;
var growthSpeed = .03;

var decro = true;
var radConst = 45;

let colors = ["#708dcb", "#385b6a", "#512e76", "#744c4d", "#692a10"];
let lerpColor;

var rules = [];
rules[0] = {
  a: "F",
  b: "[HAH]+[FAB]-[FAHB]"
  //"HFF+[+F]-AFF+-AHAHA[[FFF-A]++]HAF"
  //hexagon thing? radians must be at 45 "FF+[+F-F-F-F+F[+F]]-F-+[-F+F+F+F]"
  //b: "FF+[+F-F-F]-[-F+F+F]"
}
rules[1] = {
  a: "A",
  b: "+[H]-AH++AF]]"
  //"+A[A-A]-AH++AA]]"
  //"FF+[-F+F]"
}
rules[2] = {
  a: "H",
  b: "BA-FAZ-+FF+[F][AB]"
  //"AA+A-[FFF+[FA]]"
}
rules[3] = {
  a: "B",
  b: "[HB]+FA+B"
}
rules[4] = {
  a: "Z",
  b: "[[F+F-[Z]",
}
/*
rules[0] = {
  a: "A",
  b: "AB"
}
rules[1] = {
  a: "B",
  b: "A"
}*/

function autoGenerate(inp, flipper){
  sentence = axiom;
  for(var i = 0; i < inp; i++){
    generate(flipper);
    //generate(true);
  }
}
function contGenerate(){
  sentence = axiom;//burn our sentence so as to make a new one!
  autoGenerate(genMax, false);
  autoGenerate(genMax, true);
}

function generate(flipper) {
  len *= 1;
  var nextSentence = "";
  for(var i = 0; i < sentence.length; i++){
    var _char = sentence.charAt(i);
    var found = false;
    for(var h = 0; h < rules.length; h++){
      if(_char == rules[h].a){
        found = true;
        nextSentence += rules[h].b;
        break;
      }
    }
    if(!found){
      nextSentence += _char;
    }
  }
  sentence = nextSentence;
  //createP(sentence);
  turtle_tut(flipper);
}

function rColor(){
  //todo colors or something
}

function turtle_tut(flipped){
  resetMatrix();
  translate(width/2, (height - height/2));
  //background(51);
  
  stroke(colors[1]);
  for(var i = 0; i < sentence.length; i++){
    var current = sentence.charAt(i);
    switch (current){
      case 'F':
        if(flipped){
          line(0,0,0,+len);
          translate(0,+len);
        } else {
          line(0,0,0,-len);
          translate(0,-len);
        }
        break;
      case '+':
        rotate(+angle);
        break;
      case '-':
        rotate(-angle);
        circle(0,0,5);
        fill(colors[0]);
        //strokeWeight(3);
        break;
      case '[':
        push();
        break;
      case ']':
        pop();
        break;
      case 'H':
        //circle(0,0,10);
        fill(colors[4]);
        //strokeWeight(2);
        break;
      case 'B':
        //circle(0,0,5);
        fill(colors[2]);
        //strokeWeight(1);
        break;
      case 'Z':
        //circle(0,0,5);
        fill(colors[3]);
        break;
    }
  }
}

function setup() {
  angle = radians(radConst);
  createCanvas(windowWidth, windowHeight);
  background(51);
  //var button = createButton("generate");
  //button.mousePressed(generate);
  //turtle_tut(true);
  autoGenerate(genMax);
}

function iterateRadians() {
  if(decro){
    //radConst++;
    radConst -= rotationSpeed;
    len -= growthSpeed;
  } else if(!decro){
    //radConst--;
    radConst += rotationSpeed;
    len += growthSpeed;
  if(radConst > 360 || radConst < -360){
    decro = !decro;
  }
  console.log(radConst);
  }
}
let c = [0,0,0,15];
function draw() {
  background(c);
  angle = radians(radConst);
  contGenerate();
  iterateRadians();
}

