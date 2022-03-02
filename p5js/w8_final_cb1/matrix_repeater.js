//matrix square repeater
//no longer a matrix square repeater, we're a funky matrix spiral called a fibo now.

var globalRotation = 1
var testFib;
var fibos = [];

function setupFibosManual(){
    testFib = new fibo(720,0,height/-5);
    fibos.push(testFib);
    //define other fibos here, as needed
}

function drawFibos(){
    globalRotation += .0005;
    for(let i = 0; i < fibos.length; i++){
        fibos[i].draw();
    }
}

class fibo{
    constructor(generations,tw,th){
        this.generations = generations;
        this.angle = 1;
        this.tw = tw;
        this.th = th;
    }
    draw(){
        let wub = 10;
        let hub = 20;
        for(let i = 0; i < this.generations; i++){
            strokeWeight(i*0.0005);
            strokeCap(SQUARE);
            stroke(255,20);
            push();
            translate((width/2)+this.tw,(height/2)+this.th);
            rotate(globalRotation * i + 1*i);
            line(0,0,0,1*i);
            // line(0,0,0,2*i);
            strokeWeight(3);
            point(1*i,1*i);
            point(1*i,2*i);
            point(-1*i,-1*i);
            point(-1*i,-2*i);
            // point(2*i,1*i);
            // point(3*i,1*i);
            pop();
        }
    }
}