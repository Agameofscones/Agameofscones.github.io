
let totalBarks = 10;
let barkArray = [];

var globalTime;

var bankA = [];
var bankB = [];
var bankC = [];
var bankD = [];

var bankAmbient = [];

function setup() {
  createCanvas(400, 400);
  loadBanks();
  for(let i = 0; i <totalBarks ; i++){
    tempBark = new timedBark("A",random(5),random(120),1);
    barkArray.push(tempBark);
  }
}

function draw() {
  globalTime = millis();
  globalTime = int(globalTime/1000);//convert to seconds from millis
  background(20,5);
  timeBarks();
}

//-------------------//
//extended setup functions

function loadBanks(){
  soundFormats('ogg');//ogg 4 lyfe
  //bankA loading
  //bankA[0] = loadSound('assets/test0');
  //bankA[1] = loadSound('assets/test1');
  //bankA[2] = loadSound('assets/test2');
  //bankA[3] = loadSound('assets/test3');
}

//-------------------//
//barkhandling

function timeBarks(){
  for(let i = 0; i < barkArray.length; i++){
    barkArray[i].runTimer();
  }
}

//-------------------//
//     BARK CLASS    //
//-------------------//

class timedBark {
  constructor(library,minDelay,maxDelay,volume){
    this.minDelay = minDelay;
    this.maxDelay = maxDelay;
    this.volume = volume;
    this.library = library;
    this.sBank = [];
    this.onCooldown = false;
    this.newDelay = 15;
    this.timer;
    this.timerRunning;
  }
  grabBank(){
    switch(this.library){//we're getting the global sound 'banks' and loading them into the bark's memory.
      case 'A':
        this.sBank = bankA;
        break;
      case 'B':
        this.sBank = bankB;
        break;
      case 'C':
        this.sBank = bankC;
        break;
      case 'D':
        this.sBank = bankD;
        break;
      case 'Ambient':
        this.sBank = bankAmbient;
        break;
    }
  }
  genNewDelay(){
    this.newDelay = random(this.minDelay,this.maxDelay);
    //console.log("Generated new bark delay");
  }
  runTimer(){
    if(!this.timerRunning){//if we're not running yet, run us.
      this.genNewDelay();
      this.timer = globalTime + this.newDelay;
      this.timerRunning = true;
      console.log("Got new bark timer");
    }
    if(globalTime > this.timer){
      console.log("BARK!");
      this.timerRunning = false;
      //temp visual input, might be useful later?
      fill(255);
      noStroke();
      circle(random(0,width),random(0,height),60);
      //do sound!
    }
    
  }
}