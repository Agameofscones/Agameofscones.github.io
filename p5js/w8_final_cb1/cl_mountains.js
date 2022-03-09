//class container script
class perlinHillObj {
    constructor(baseline,offset,yscale,iscale,perlinOffset){
        this.base = baseline;
        this.offset = offset;
        this.yscale = yscale;
        this.iscale = iscale;

        this.perlinOffset = perlinOffset;
        this.perlinScrollSpeed = 0.1;
        this.perlinScrollBool = false;

        this.offsetOnce = false;
        this.coolor = color(0);

        this.perlinScale = 1;
        this.perlinScaleMin = 0.5;
        this.perlinScaleMax = 1.5;
        this.perlinGrowth = 0.0000000192;
        this.decro = false;
    }

    perlinBreath(){
        if(this.decro){
            this.perlinScale += this.perlinGrowth;
        } else if (!this.decro){
            this.perlinScale += -this.perlinGrowth;
        }
        if(this.perlinScale > this.perlinScaleMax || this.perlinScale < this.perlinScaleMin){
            this.decro = !this.decro;
        }
    }

    generatePerlinOffset(){
        if(!this.offsetOnce){
            this.perlinOffset = random(-41300,41300);
            this.perlinScale = random(this.perlinScaleMin,this.perlinScaleMin);
            if(100 / 50 > 50){
                this.perlinGrowth = -this.perlinGrowth;//50/50 to get inverted movement
            }
            this.offsetOnce = true;
        } else {
            return;
        }
    }

    setPerlinScroll(bool){
        this.perlinScrollBool = bool;
    }

    doPerlinJump(){
        this.perlinOffset = random(-41300,41300);
    }

    doPerlinScroll(){
        if(!this.perlinScrollBool){
            return;
        } else if(this.perlinScrollBool){
            this.perlinOffset += this.perlinScrollSpeed;
        }
    }

    drawPerlinToHill(){
        this.perlinBreath();
        beginShape();
        vertex(0,this.base);
        noStroke();
        fill(this.coolor);
        for(let i = 0; i < width; i++){
            let yran = noise((i/this.iscale)+this.perlinOffset*this.perlinScale);
            vertex(i,(yran*this.yscale*this.perlinScale)+(this.offset));
        }
        vertex(width,this.base);
        endShape();
    }
}