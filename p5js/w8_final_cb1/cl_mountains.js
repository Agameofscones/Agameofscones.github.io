//class container script
class perlinHillObj {
    constructor(baseline,offset,yscale,iscale,perlinOffset){
        this.base = baseline;
        this.offset = offset;
        this.yscale = yscale;
        this.iscale = iscale;

        this.perlinOffset = perlinOffset;
        this.perlinScrollSpeed = 0.001;
        this.perlinScrollBool = false;

        this.offsetOnce = false;
        this.coolor = color(0);

    }


    generatePerlinOffset(){
        if(!this.offsetOnce){
            this.perlinOffset = random(-41300,41300);
            this.offsetOnce = true;
        } else {
            return;
        }
    }

    setPerlinScroll(bool){
        this.perlinScrollBool = bool;
    }

    doPerlinJump(){
        console.log("penis!");
        this.perlinOffset = random(-41300,41300);
    }

    doPerlinScroll(){
        if(!this.perlinScrollBool){
            //console.log("It is not penis fridays");
            return;
        } else if(this.perlinScrollBool){
            //console.log("penis fridays");
            this.perlinOffset += this.perlinScrollSpeed;
        }
    }

    drawPerlinToHill(){
        beginShape();
        vertex(0,this.base);
        noStroke();
        fill(this.coolor);
        for(let i = 0; i < width; i++){
            let yran = noise((i/this.iscale)+this.perlinOffset);
            vertex(i,(yran*this.yscale)+(this.offset));
        }
        vertex(width,this.base);
        endShape();
    }
}