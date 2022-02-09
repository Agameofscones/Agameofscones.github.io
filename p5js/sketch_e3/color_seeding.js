//color seeding
var seed;

var colors = [];
var brights = [];
var totalColors = 5;

function seedColors() {
    //based on the work done in https://editor.p5js.org/RudyG22/sketches/rkCtpaI2Q
    //Thanks RudyG22, you're a real legend
    let H = 10;
    let S = 20;
    let L = 10;
    console.log("Project seed is: " + seed);
    for(let i = 0; i < totalColors; i++){
        let nH = H+random(60);
        let nS = S+random(0,80);
        let nL = L+random(20);
        let imstuff = color(nH,nS,nL);
        colors.push(imstuff);
        brights.push(color(nH,nS,nL+20));
    }
}