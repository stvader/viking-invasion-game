import Entity from './Entity.js';

export default class Hero extends Entity{
    constructor(/*fieldContext,*/ imgId, pos, callbackRender) { /**/
        const parentOptions = {
            //fieldContext: fieldContext,
            imgId: imgId,
            speed: 4,
            scale: 3,
            widthSlideImg: 250,
            heightSliderImg: 400,
            pos: pos,
            callbackRender: callbackRender /**/
        }

        super(parentOptions);
        
        this.moveDir = 'right';
        this.dead = false;
        this.attackStage = false;
        this.soundHeroStep = document.getElementById('sound-step');
        this.soundHeroDeath = document.getElementById('hero-death');
        
        this.sliderVerticalPosRunRight = this.heightSliderImg * 0;
        this.sliderVerticalPosRunLeft = this.heightSliderImg * 1;
        this.sliderVerticalPosAttackRight = this.heightSliderImg * 2;
        this.sliderVerticalPosAttackLeft = this.heightSliderImg * 3;
        this.sliderVerticalPosDead = this.heightSliderImg * 4;
        this.sliderRunWidth = 2500;
        this.sliderAttackWidth = 1500;
        this.sliderStartPos = 0; 
        this.sliderHorizontAttackStep = 300;
        this.sliderHorizontDieStep = 600;
        this.sliderDieWidth = 450;
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

    animate() {

        this.currentSlideX += this.widthSlideImg;
        if (this.currentSlideX >= this.sliderRunWidth) {
            this.currentSlideX = this.sliderStartPos;
        }

        this.soundHeroStep.play();
    }
    
    move(dir) {        

        switch(dir) {
            case 'down':                          
                    this.currentPos[1] += this.speed;                
                break;
            case 'up':                
                this.currentPos[1] -= this.speed;
                break;
            case 'left': 
                if (this.moveDir !== 'left') {
                    this.moveDir = 'left';
                    this.currentSlideY = this.sliderVerticalPosRunLeft;
                } else {              
                    this.currentPos[0] -= this.speed;
                }
                break;
            case 'right':
                if (this.moveDir !== 'right') {
                    this.moveDir = 'right';
                    this.currentSlideY = this.sliderVerticalPosRunRight;
                } else {               
                    this.currentPos[0] += this.speed;
                }
                break;
        }           
    }

    changeSlides(slideY, widthSlide = 250) {
        
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
            this.isAttack = false;
            this.currentSlideX = this.sliderStartPos;
            let slideY;
            if(this.moveDir === 'right') {
                slideY = this.sliderVerticalPosRunRight;
            } else if(this.moveDir === 'left') {
                slideY = this.sliderVerticalPosRunLeft;
            }
            this.changeSlides(slideY);
        }
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

        this.soundHeroDeath.play();
    }

    render() {
        super.render();        

        if(this.isDead) {
            this.die();
        } else if(this.isAttack) {
            this.attack();
        }       
    }     
}
