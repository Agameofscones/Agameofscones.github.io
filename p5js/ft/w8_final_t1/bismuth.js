//Bismuth classes
class bismuthSystem {
    constructor(axiom,genMax,angle){
        this.axiom = axiom;
        this.sentence = this.axiom;//test, should be set to axiom
        this.genMax = genMax;
        this.angle = angle;
        this.len = 10;
        this.rules = [];
        this.rules[0] = {
            a:"A",
            b:"ABC"
        }
        this.rules[1] = {
            a:"B",
            b:"AD"
        }
        this.rules[2] = {
            a:"C",
            b:"A!D![BA]"
        }
        this.rules[3] = {
            a:"D",
            b:"A@C@B"
        }
    }
    generate(){
        var nextSentence = "";
        for(let i = 0; i < this.sentence.length; i++){
            var current = this.sentence.charAt(i);
            var found = false;
            for(let h = 0; h < this.rules.length; h++){
                if(current == this.rules[h].a){
                    found = true;
                    nextSentence += this.rules[h].b;
                    break;
                }
            }
            if(!found){
                nextSentence += current;
            }
        }
        this.sentence = nextSentence;
        this.turtleTut();
    }
    turtleTut(){
        resetMatrix();
        translate(width/2,height/2);//center us
        noStroke(255);//replace later
        console.log("Cock n balls");
        for(let i = 0; i < this.sentence.length; i++){
            var current = this.sentence.charAt(i);
            switch(current){
                case 'A':
                    // fill(240);
                    // rect(0,0,20,10);
                    // rect(20,10,20,10);
                    break;
                case 'B':
                    fill(70);
                    rect(0,0,100,10);
                    rect(0,0,10,100);
                    fill(80);
                    rect(10,10,90,10);
                    rect(10,10,10,90);
                    fill(90);
                    rect(20,20,80,10);
                    rect(20,20,10,80);
                    fill(100);
                    rect(30,30,70,10);
                    rect(30,30,10,70);
                    fill(110);
                    rect(40,40,60,10);
                    rect(40,40,10,60);
                    fill(120);
                    rect(50,50,50,10);
                    rect(50,50,10,50);
                    fill(130);
                    rect(60,60,40,10);
                    rect(60,60,10,40);
                    fill(140);
                    rect(70,70,30,10);
                    rect(70,70,10,30);
                    fill(150);
                    rect(80,80,20,10);
                    rect(80,80,10,20);
                    fill(160);
                    rect(90,90,10,10);
                    break;
                case 'C':
                    this.falseFibonacci(24);
                    break;
                case 'D':

                    break;
                case '[':
                    push();
                    break;
                case ']':
                    pop();
                    break;
                case '!':
                    rotate(this.angle);
                    break;
                case '@':
                    rotate(-this.angle);
                    break;
            }
        }
        //createP(this.sentence);

    }
    falseFibonacci(g){
        for(let i = 0; i < g; i++){
            push();
            scale(1 + .10 * i);
            fill(75, 130-i*4, 220-i*4);
            rect(0,0,10,20);
            rect(10,0,20,10);
            rect(20,0,10,40);
            rect(-30,40,60,10);
            rect(-30,40,10,-120);
            rect(-30,-90,130,10);
            rect(100,-90,10,360);
            pop();
        }
    }
}