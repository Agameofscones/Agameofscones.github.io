function setup() {
  createCanvas(windowWidth,windowHeight);
  // noLoop();
}

function draw() {
  background(0);
  perlinHill(height,300,500,500,200);
  perlinHill(height,500,400,500,6000);
  perlinHill(height,700,200,500,-7181);
}

function perlinHill(base,offset,yscale,iscale,perlinOffset){
  if(!perlinOffset){
    perlinOffset = random(-41300,41300);//worble
  }
  beginShape();
  vertex(0,base);
  //noFill();
  for(let i = 0; i < width; i++){
    let yran = noise((i/iscale)+perlinOffset);
    vertex(i,(yran*yscale)+(offset));
  }
  vertex(width,base);
  endShape();

}