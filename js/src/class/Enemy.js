import Entity from './Entity.js';

export default class Enemy extends Entity{
    constructor(options, callbackRender) {
        const parentOptions = {            
            imgId: 'enemy-slider',
            speed: options.speed,
            scale: 3,
            widthSlideImg: 200,
            heightSliderImg: 350,
            pos: options.startCoord,
            callbackRender: callbackRender
        }

        super(parentOptions);

        this.startPos = options.startCoord;
        this.endPos = options.endCoords;        
        this.moveDir = 'right';
        this.dead = false;
        this.attackStage = false;
        this.soundEnemyAttack = document.getElementById('enemy-sword');      
        this.soundEnemyDeath = document.getElementById('enemy-death');

        this.sliderVerticalPosRunRight = this.heightSliderImg * 0;
        this.sliderVerticalPosRunLeft = this.heightSliderImg * 1;
        this.sliderVerticalPosAttackRight = this.heightSliderImg * 2;
        this.sliderVerticalPosAttackLeft = this.heightSliderImg * 3;
        this.sliderVerticalPosDead = this.heightSliderImg * 4;
        this.sliderRunWidth = 2000;
        this.sliderAttackWidth = 1500;
        this.sliderHorizontAttackStep = 300;
        this.sliderStartPos = 0; 
        this.sliderHorizontDieStep = 600;
        this.sliderDieWidth = 400;
    }

    get isDead() {
        return this.dead;
    }

    set isDead(stage) {
        this.dead = stage;
    }

    get isAttack() {
        return this.attackStage;
    }

    set isAttack(stage) {
        this.attackStage = stage;
    }

    moveToRight() {
       this.currentPos[0] += this.speed;
    }

    moveToLeft() {
       this.currentPos[0] -= this.speed;
    }

    animate() {
        this.currentSlideX += this.widthSlideImg;
        if (this.currentSlideX >= this.sliderRunWidth) {
            this.currentSlideX = this.sliderStartPos;
        }   
    }

    move() {
        this.animate();
       
        if (this.moveDir === 'right' ) {
            this.moveToRight();
            if(this.currentPos[0] >= this.endPos[0]) {
                this.moveDir = 'left';
                this.currentSlideY = this.sliderVerticalPosRunLeft;
            }
        } else if (this.moveDir === 'left') {
            this.moveToLeft();
            if(this.currentPos[0] <= this.startPos[0]) {
                this.moveDir = 'right';
                this.currentSlideY = this.sliderVerticalPosRunRight;
            }
        }         
    }

    changeSlides(slideY, widthSlide) {
        
        this.widthSlideImg = widthSlide;
        this.widthSlideOnMap = this.widthSlideImg/this.scale;       
        this.currentSlideY = slideY;
    }

    attack() {        
        let slideY;

        if(this.moveDir === 'right') {
            slideY = this.sliderVerticalPosAttackRight;
        } else if(this.moveDir === 'left') {
            slideY = this.sliderVerticalPosAttackLeft;
        }

        this.changeSlides(slideY, this.sliderHorizontAttackStep);        
        this.currentSlideX += this.widthSlideImg;

        if(this.currentSlideX >= this.sliderAttackWidth) {            
            this.currentSlideX = this.sliderStartPos;            
        }

        this.soundEnemyAttack.play();
    }

    die() {
        if(this.moveDir === 'right') {
            this.currentSlideX = this.sliderStartPos;
        } else if(this.moveDir === 'left') {
            this.currentSlideX = this.sliderHorizontDieStep;
        }
        this.currentSlideY = this.sliderVerticalPosDead;
        this.widthSlideImg = this.sliderDieWidth;        
        this.widthSlideOnMap = this.widthSlideImg/this.scale;

        this.soundEnemyDeath.play();
    }

    render() {
        super.render();

        if(!this.isDead && !this.isAttack) {
            this.move();
        } else if(this.isDead) {
            this.die();
        } else if(this.isAttack) {
            this.attack();
        }        
    }   
    
}
