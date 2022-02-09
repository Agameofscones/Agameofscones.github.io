//they're waiting for you gordon, in the test chamberrrrrrrr
class cable{
    constructor(startX,startY,width,step,pieces,calor){
        this.startX = startX;
        this.startY = startY;
        this.pieces = pieces;
        this.step = step;
        this.width = width;
        this.calor;
        this.sister = [];//the sister cable piece to 'close' the cable, also used for the centre cable
    }

    setColor(c){
        this.calor = c;
    }
    setRandomColor(){
        let r = int(random(0,4));
        if(lampOn){
            this.calor = colors[r];
        } else {
            this.calor = brights[r];
        }
        //this.calor = colors[r];
    }

    genCable(b){
        for(let i = 0; i < this.pieces; i++){
            let newOffset;
            if(b){
                newOffset = getStepOffset(true)*i/3;
            } else {
                newOffset = getStepOffset(false)*i/3;
            }
            
            this.sister.push(newOffset);
            //console.log("saved new offset");
        }
    }
    drawSisters(){
        let taper = 17;
        noFill();
        beginShape();//left
        strokeWeight(4);
        stroke("#000000");
        curveVertex(this.startX, this.startY);
        for(var i = 0; i < this.pieces; i++){
            let _r = this.sister[i];
            curveVertex(this.startX+_r,this.startY+this.step*i);
        }
        endShape();

        beginShape();//right
        strokeWeight(4);
        stroke("#000000");
        curveVertex(this.startX, this.startY);
        for(var i = 0; i < this.pieces; i++){
            let _r = this.sister[i];
            curveVertex(this.startX+_r+this.width,this.startY+this.step*i);
        }
        endShape();

        beginShape();//centre   
        strokeWeight(6);
        //stroke("#fcba03");
        stroke(this.calor);
        curveVertex(this.startX, this.startY);
        for(var i = 0; i < this.pieces; i++){
            let _r = this.sister[i];
            curveVertex(this.startX+_r+this.width/2,this.startY+this.step*i);
        }
        endShape();
    }
}

class cableCollection{
    constructor(amount,posX,posY,bulbAmt,wiggleBool){
        this.amount = amount;
        this.posX = posX;
        this.posY = posY;
        this.cables = [];
        this.bulbs = [];
        this.bulbAmt = bulbAmt;
        this.wiggleBool = wiggleBool;
    }
    setupCables(){
        for(let i = 0; i < this.amount; i++){
            let rStep = int(random(70,100))
            let newCable = new cable(this.posX,this.posY,10,rStep,30);
            this.cables.push(newCable);
        }
        for(let j = 0; j < this.amount; j++){
            this.cables[j].setColor(colors[0]);
            if(this.wiggleBool){
                this.cables[j].genCable(true);
            } else {
                this.cables[j].genCable(false);
            }
            
        }
    }
    drawCableCollection(){
        for(let i = 0; i < this.cables.length; i++){
            this.cables[i].drawSisters();
        }
    }
    setupBulbs(){
        for(let i = 0; i < this.bulbAmt; i++){
            let offX = random(-25,15);
            let offY = random(0,5);
            let rScale = random (0.7, 1.2);
            let littleBobbyBulb = new bulb(45,rScale,this.posX-25,this.posY+offY,colors[3]);
            littleBobbyBulb.setupBulb();
            this.bulbs.push(littleBobbyBulb);
        }
    }
    drawBulbs(){
        for(let i = 0; i < this.bulbs.length; i++){
            this.bulbs[i].refreshBulb();
        }
    }
    passColors(c){
        for(let i = 0; i < this.cables.length; i++){
            //this.cables[i].setColor(c);
            this.cables[i].setRandomColor();
        }
        for(let j = 0; j < this.bulbs.length; j++){
            //this.bulbs[j].toggleColor();
            this.bulbs[j].randomColor();
        }
    }
}

class bulb{
    constructor(radius,scale,posX,posY,c){
        this.radius = radius;
        this.scale = scale;
        this.posX = posX;
        this.posY = posY;
        this.color = c;
        this.onBool = false;
        this.rangle = random(-15,0);
        this.sCable;
    }
    setupBulb(){
        this.sCable = new cableCollection(1,1,0,0,true);
        this.sCable.setupCables();
    }
    toggleColor(){
        if(this.onBool){
            this.color = colors[3];
            this.sCable.passColors();
        } else if(!this.onBool){
            this.color = brights[2];
            this.sCable.passColors();
        }
        this.onBool = !this.onBool;
    }
    randomColor(){
        let r = int(random(0,4));
        if(lampOn){
            this.color = brights[r];
            this.sCable.cables[0].calor = brights[r];
        } else {
            this.color = colors[r];
            this.sCable.cables[0].calor = colors[r];
        }
    }
    refreshBulb(){
        rectMode(CENTER);
        //console.log("idaho");
        //fill(this.color);
        push();
        angleMode(DEGREES);
        translate(this.posX+40, this.posY-10);
        this.sCable.drawCableCollection();
        this.randomColor();
        fill(this.color);
        //this.rangle = atan2(this.posY,this.sCable.startY+20);
        scale(this.scale);
        rotate(this.rangle);//todo, relative to point
        stroke(0);
        //circle(this.sCable.startX,this.sCable.startY,this.radius);
        rect(5,0+30,25,20,25);
        rect(5,0+20,30,20,55);
        //rect(this.posX+40,this.pos+40,60,55);
        
        circle(5,0,this.radius);
        pop();
    }
}