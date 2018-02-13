export default class Map {
    constructor(map, fieldContext, fieldWidth, fieldHeight) {
        this.fieldContext = fieldContext;
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;        
        this.map = map;
        this.mapImage = document.getElementById('bg-slider');
        this.bgSquireWidth = 31.6;
        this.bgSquireHeight = 31.6;
        this.topPadding = 9;
        this.fieldSquireWidth = 60;
        this.fieldSquireHeight = 60;
        this.fieldWidthNum = this.fieldWidth/this.fieldSquireWidth;
        this.fieldHeightNum = this.fieldHeight/this.fieldSquireHeight;
        this.goalObj = {};
        this.bariersColl = [];

        this.bgObjTuning = this.map.bg;
        this.goalObjTuning = this.map.goal;
        this.bariers = this.map.bariers;

        this.bariers.forEach((barier) => {
            this.bariersColl.push({
                posCentre: [(barier.x + 0.5) * this.fieldSquireWidth,
                            (barier.y + 0.5) * this.fieldSquireHeight],
                width: this.fieldSquireWidth,
                height: this.fieldSquireHeight,
                top: barier.y * this.fieldSquireWidth,
                bottom: (barier.y + 1) * this.fieldSquireHeight,
                left: barier.x * this.fieldSquireWidth,
                right: (barier.x + 1) * this.fieldSquireWidth
            });            
        });        
    }

    drawCanvas(coordX, coordY, /*dx, dy,*/ dxNum, dyNum, sWidth = 1, sHeight = 1) { 
        const countSquiresImgWidth = sWidth;
        const countSquiresImgHeight = sHeight;

        let sx = coordX * this.bgSquireWidth;
        let sy = this.topPadding + (coordY * this.bgSquireHeight);

        let dx = dxNum * this.fieldSquireWidth;
        let dy = dyNum * this.fieldSquireHeight;
        
        this.fieldContext.drawImage(this.mapImage, 
                        sx, sy, 
                        this.bgSquireWidth * countSquiresImgWidth, this.bgSquireHeight * countSquiresImgHeight,
                        dx, dy, 
                        this.fieldSquireWidth * countSquiresImgWidth, this.fieldSquireWidth * countSquiresImgWidth);
    }

    drawOwnBg() {
        let dx = 0;
        let dy = 0;

        while (dy < this.fieldHeightNum) {
            this.drawCanvas(this.bgObjTuning.sx, this.bgObjTuning.sy, dx, dy);
            
            dx = (dx + 1) % this.fieldWidthNum;
            if (!dx) {
                dy = dy + 1;
            }
        }
    }

    createGoal() {
        const goal = this.goalObjTuning;

        this.goalObj = {
            left: goal.dx * this.fieldSquireWidth,
            right: (goal.dx + goal.sWidth) * this.fieldSquireWidth,
            top: goal.dy * this.fieldSquireHeight,
            bottom: (goal.dy + goal.sHeight) * this.fieldSquireHeight            
            /*posCentre: [(goal.dx + goal.sWidth/2) * this.fieldSquireWidth,
                        (goal.dy + goal.sHeight/2) * this.fieldSquireHeight],*/
            /*width: goal.sWidth * this.bgSquireWidth,*/
            /*height: goal.sHeight * this.bgSquireHeight*/
        }        

        this.drawCanvas(goal.sx, goal.sy, goal.dx, goal.dy,
                        goal.sWidth, goal.sHeight);
    }

    createBariers() {          

        this.bariers.forEach((barier) => {
            this.drawCanvas(5, 2, barier.x, barier.y)
        });        
    }

    createMap() {        

        this.drawOwnBg();
        this.createGoal();
        this.createBariers();        
    }
}
