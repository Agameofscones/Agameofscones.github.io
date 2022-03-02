//color seeding, once more based on RudyG22's work
//based on the work done in https://editor.p5js.org/RudyG22/sketches/rkCtpaI2Q
//Thanks RudyG22, you're a real legend
var seed;

var colors = [];
var brights = [];//unused atm
var totalColors = 5;
var hillColors = [];

var bkColor;

function seedColors() {
    
    let H = 10;
    let S = 20;
    let L = 10;
    //console.log("Project seed is: " + seed);
    for(let i = 0; i < totalColors; i++){
        let nH = H+random(60);
        let nS = S+random(0,80);
        let nL = L+random(20);
        let imstuff = color(nH,nS,nL);
        colors.push(imstuff);
        brights.push(color(nH,nS,nL+20,100));
    }
}
function seedHillColors(){
    let H = 50;
    let S = 80;
    let L = 20;
    for(let i = 0; i < totalHills; i++){
        let nH = H+(-2*i);
        let nS = S+(-2*i);
        let nL = L+(-2*i);
        let imstuff = color(nH,nS,nL,100);
        hillColors.push(imstuff);
    }
}
