//letterbox doohicky
//going to do this entire thing manually, because man fuck it, why not

var letterboxColor;
var LxH = 2;
var LxW = 5;

var LxH_G = 0.009;
var LxW_G = 0.018;

function drawLetterBox(){
    fill(letterboxColor);
    noStroke();
    rect(0,0,width,height/LxH);
    rect(0,0,width/LxW,height);
    rect(width,0,width/-LxW,height);
    rect(0,height,width,height/-LxH);
    LxH += LxH_G;
    LxW += LxW_G;
}