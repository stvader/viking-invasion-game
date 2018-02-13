import Entity from './Entity.js';

export default class Ammunition extends Entity {
    constructor(/*fieldContext,*/ pos, callbackRender) {
        const parentOptions = {
           /* fieldContext: fieldContext,*/
            imgId: 'weapon-slider',
            speed: null,
            scale: 1.2,
            widthSlideImg: 100,
            heightSliderImg: 60,
            pos: pos,
            callbackRender: callbackRender
        }

        super(parentOptions);

        this.currentSlideX = 200;
        this.currentSlideY = 20;        
    }   
}
