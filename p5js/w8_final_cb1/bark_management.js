
let totalBarks = 10;
let barkArray = [];

var globalTime;

var bankA = [];
var bankB = [];
var bankC = [];
var bankD = [];

var bankAmbient = [];
var bankNoise = [];

var bankClick = [];
var clickbuild = 120;

let testSound;

//-------------------//
//extended setup functions

function loadBanks(){
  
  //could this be done more efficiently, yes! Am I going to do it all manually? Also yes!
  //I have no sense of right or wrong, hahahahah!
  bankClick[0] = loadSound('assets/clack.ogg');

  bankNoise[0] = loadSound('assets/amb_pink_noise.ogg');

  bankAmbient[0] = loadSound('assets/amb_spit.ogg');
  
  bankA[0] = loadSound('assets/tempest_0');
  bankA[1] = loadSound('assets/tempest_1');
  bankA[2] = loadSound('assets/tempest_2');
  bankA[3] = loadSound('assets/tempest_3');
  bankA[4] = loadSound('assets/tempest_4');
  bankA[5] = loadSound('assets/tempest_5');
  bankA[6] = loadSound('assets/tempest_6');
  bankA[7] = loadSound('assets/tempest_7');

  bankB[0] = loadSound('assets/nails_0.ogg');
  bankB[1] = loadSound('assets/nails_1.ogg');
  bankB[2] = loadSound('assets/nails_2.ogg');
  bankB[3] = loadSound('assets/nails_3.ogg');
  bankB[4] = loadSound('assets/nails_4.ogg');
  bankB[5] = loadSound('assets/nails_5.ogg');
  bankB[6] = loadSound('assets/nails_6.ogg');
  bankB[7] = loadSound('assets/nails_7.ogg');
  bankB[8] = loadSound('assets/nails_8.ogg');
  bankB[9] = loadSound('assets/nails_9.ogg');
  bankB[10] = loadSound('assets/nails_10.ogg');

  bankC[0] = loadSound('assets/sand_0.ogg');
  bankC[1] = loadSound('assets/sand_1.ogg');
  bankC[2] = loadSound('assets/sand_2.ogg');
  bankC[3] = loadSound('assets/sand_3.ogg');
  bankC[4] = loadSound('assets/sand_4.ogg');
  bankC[5] = loadSound('assets/sand_5.ogg');
  bankC[6] = loadSound('assets/sand_6.ogg');
  bankC[7] = loadSound('assets/sand_7.ogg');
  bankC[8] = loadSound('assets/sand_8.ogg');
  bankC[9] = loadSound('assets/sand_9.ogg');
  bankC[10] = loadSound('assets/sand_10.ogg');
  bankC[11] = loadSound('assets/sand_11.ogg');
  bankC[12] = loadSound('assets/sand_12.ogg');
  bankC[13] = loadSound('assets/sand_13.ogg');
  bankC[14] = loadSound('assets/sand_14.ogg');
  bankC[15] = loadSound('assets/sand_15.ogg');
  bankC[16] = loadSound('assets/sand_16.ogg');

  bankD[0] = loadSound('assets/slide_0.ogg');
  bankD[1] = loadSound('assets/slide_1.ogg');
  bankD[2] = loadSound('assets/slide_2.ogg');
  bankD[3] = loadSound('assets/slide_3.ogg');

  //todo, finishing loading the audio banks

  //bankA[2] = loadSound('assets/test2');
  //bankA[3] = loadSound('assets/test3');
  for(let i = 0; i < totalBarks ; i++){
    let bankNames = ['A','B','C','D'];
    let bankName = random(bankNames);
    tempBark = new timedBark(bankName,random(20),random(160),1);
    tempBark.grabBank();
    barkArray.push(tempBark);
  }
  pinkNoiseBark = new timedBark("Noise",28,28,1);
  pinkNoiseBark.grabBank();
  //pinkNoiseBark.playSound();
  barkArray.push(pinkNoiseBark);

  ambientSpit = new timedBark("Ambient",67,67,1);
  ambientSpit.grabBank();
  
  barkArray.push(ambientSpit);

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
      case 'Noise':
        this.sBank = bankNoise;
    }
  }
  playSound(){
    console.log("Bork!");
    let s = int(random(0,this.sBank.length));
    this.sBank[s].play();
  }

  genNewDelay(){
    this.newDelay = random(this.minDelay,this.maxDelay);
    //console.log("Generated new bark delay");
  }
  runTimer(){
    //console.log("running bark timer");
    if(!this.timerRunning){//if we're not running yet, run us.
      this.genNewDelay();
      this.timer = globalTime + this.newDelay;
      this.timerRunning = true;
      //console.log("Got new bark timer");
    }
    if(globalTime > this.timer){
      //console.log("Bork!");
      let s = int(random(0,this.sBank.length));
      this.sBank[s].play();
      
      //testSound.play();
      this.timerRunning = false;
      //temp visual input, might be useful later?
      fill(bkColor);
      noStroke();
      circle(random(0,width),random(0,height),2);//todo make an eyeball
      circle(random(0,width),random(0,height),3);
      circle(random(0,width),random(0,height),2);
      circle(random(0,width),random(0,height),1);
      circle(random(0,width),random(0,height),1);
      circle(random(0,width),random(0,height),1);
      circle(random(0,width),random(0,height),2);
      circle(random(0,width),random(0,height),3);
      circle(random(0,width),random(0,height),4);
      circle(random(0,width),random(0,height),4);
      circle(random(0,width),random(0,height),3);
      circle(random(0,width),random(0,height),2);
      circle(random(0,width),random(0,height),5);
      let jumpHill = int(random(0,perlinHills.length));
      perlinHills[jumpHill].doPerlinJump();
      
      if(clickbuild < 150){
        clickbuild += 10;
        //console.log("cocks");
        console.log(clickbuild);
      } else if (clickbuild >= 150){
        //console.log("penis friday");
        clickbuild = 10;
        bankClick[0].play();
        flipFiboColors();
        console.log(clickbuild);
      }

    }
  }
}