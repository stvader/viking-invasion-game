export default class Entity {
    constructor(options) {        
        this.img = document.getElementById(options.imgId);
        this.speed = options.speed;
        this.scale = options.scale;
        this.currentSlideX = 0;
        this.currentSlideY = 0;        
        this.widthSlideImg = options.widthSlideImg;
        this.heightSliderImg = options.heightSliderImg;
        this.currentPos = options.pos.slice();
        this.widthSlideOnMap = this.widthSlideImg/this.scale;
        this.heightSlideOnMap = this.heightSliderImg/this.scale;
        this.callbackRender = options.callbackRender;
    }   

    render() { 
        
        const renderOptions = {
            img: this.img, /**/
            sx: this.currentSlideX,
            sy: this.currentSlideY,
            sWidth: this.widthSlideImg,
            sHeight: this.heightSliderImg,
            dx: this.currentPos[0] - this.widthSlideOnMap/2,
            dy: this.currentPos[1] - this.heightSlideOnMap/2,
            dWidth: this.widthSlideOnMap,
            dHeight: this.heightSlideOnMap
        } /*divesion on 2 for middle*/   
       
        this.callbackRender(renderOptions); /**/
    }

    getBorders() {
        return {
            left: this.currentPos[0] - this.widthSlideOnMap/2,
            right: this.currentPos[0] + this.widthSlideOnMap/2,
            top: this.currentPos[1] - this.heightSlideOnMap/2,
            bottom: this.currentPos[1] + this.heightSlideOnMap/2
        }
    }

}
