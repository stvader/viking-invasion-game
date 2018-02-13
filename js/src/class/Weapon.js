import Entity from './Entity.js';

export default class Weapon extends Entity {
    constructor(options) {
        const parentOptions = {           
            imgId: 'weapon-slider',
            speed: 10,
            scale: 1.2,
            widthSlideImg: 100,
            heightSliderImg: 100,
            pos: options.startPos,
            callbackRender: options.callbackRender
        }

        super(parentOptions);
        
        this.endPos;
        this.flyDist = 200;             
        this.offset = options.offset;
        this.dir = options.dir;
        this.callbackDel = options.callbackDel;        
        this.arrNum = options.arrNum;
        this.soundWeaponFlying = document.getElementById('axe-flying');        
        this.sliderVerticalLeft = this.heightSliderImg * 1;
        this.sliderWidth = 800;
        this.sliderStartPos = 0;


        if (this.dir === 'right') {
            this.currentPos[0] += this.offset;
            this.endPos =  this.currentPos[0] + this.flyDist;
        } else if (this.dir === 'left') {
            this.currentPos[0] -= this.offset;
            this.currentSlideY = this.sliderVerticalLeft;
            this.endPos =  this.currentPos[0] - this.flyDist;
        }        
    }

    deleteWeapon() {
        this.currentPos[0] = this.endPos;
        this.callbackDel(this.arrNum);        
    }

    move() {
        if (this.dir === 'right') {
            this.currentPos[0] += this.speed;
            if (this.currentPos[0] >= this.endPos) {
                this.deleteWeapon();                
            }
        } else if (this.dir === 'left') {
            this.currentPos[0] -= this.speed;
            if (this.currentPos[0] <= this.endPos) {
                this.deleteWeapon();
            }
        }

        this.currentSlideX += this.widthSlideImg;
        if (this.currentSlideX >= this.sliderWidth) {
            this.currentSlideX = this.sliderStartPos;
        }

        this.soundWeaponFlying.play();        
    }

    render() {
        super.render();       
        this.move();
    }  
}
