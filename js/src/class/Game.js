import Map from './Map.js';
import Hero from './Hero.js';
import Enemy from './Enemy.js';
import Weapon from './Weapon.js';
import Ammunition from './Ammunition.js';
import {keysLib} from './../lib/keysEventsLib.js';

export default class Game {
    constructor(options) {
        this.levelMap = options.map;
        this.canvas = document.getElementById('game-canvas');
        this.canvasContext = this.canvas.getContext('2d');
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.isGameOver = false;
        this.isWinner = false;
        this.callbackGameOver = options.callbackGameOver;
        this.callbackWinner = options.callbackWinner;        
        this.lastTime = Date.now();/**/
        this.playerTuning = options.playerTuning;
        this.enemyTuning = options.enemyTuning;
        this.ammunitionTuning = options.ammunitionTuning;
        this.weaponCounter = 1;        
        this.weaponCounterDiv = document.getElementById('weapon-counter');
        this.mapObject = new Map(this.levelMap, this.canvasContext, this.canvasWidth, this.canvasHeight);
        this.player = new Hero(this.playerTuning.imgId, this.playerTuning.pos, this.renderEntityNew.bind(this));
        this.enemies = [];
        this.weapon = [];
        this.ammunition = [];
        this.lastFlightWeapon = Date.now();
        this.soundWin = document.getElementById('win-scream');        
        this.input = keysLib();
        this.addLengthBariers = 10;/*need for bug with bariers collision*/
        this.weaponThrowDelay = 5000;   

        this.bgMusic = document.getElementById('bg-music');     
    }

    renderEntityNew(options) {/**/
        this.canvasContext.drawImage(options.img, 
                                options.sx, options.sy, options.sWidth, options.sHeight, 
                                options.dx, options.dy, options.dWidth, options.dHeight);
    }

    render() {
        this.mapObject.createMap();        

        this.renderEntity(this.player);        
        this.renderEntities(this.weapon);       
        this.renderEntities(this.enemies);
        this.renderEntities(this.ammunition);
    }

    renderEntities(list) {
        list.forEach((item) => this.renderEntity(item))
    }

    renderEntity(entity) {        
        entity.render();        
    }  

    createLevelEnemies(enemyTuning) {
        enemyTuning.forEach((enemy) => {              
            this.enemies.push(new Enemy(enemy, this.renderEntityNew.bind(this)));
        });
    }

    createLevelAmmunition(ammunitionTuning) {
        ammunitionTuning.forEach((ammUnit) => {
            this.ammunition.push(new Ammunition(ammUnit.pos, this.renderEntityNew.bind(this)));
        });
    }

    deleteWeapon(arrItem) {
        this.weapon.splice(arrItem, 1);
        window.console.log('del');
    }    

    startGameCircle() {                   
       
        this.render();
        this.update();        
       
        if(this.isGameOver || this.isWinner) return;
        requestAnimationFrame(this.startGameCircle.bind(this));
    }    

    canMove(dir) {
        let result = true;

        const player = this.player.getBorders(); 

        switch(dir) {
            case 'down':
                if(player.bottom > this.canvasHeight) {            
                    return false;
                }

                this.mapObject.bariersColl.forEach((barier) => {
                    
                    if(player.bottom > barier.top &&
                        player.left < barier.right - this.addLengthBariers &&
                        player.right > barier.left  + this.addLengthBariers &&
                        player.bottom < barier.bottom) {

                        result = false;
                    } 
                });
                break;

            case 'up':
                if(player.top < 0) {                
                    return false;
                }

                this.mapObject.bariersColl.forEach((barier) => {
                    
                     if(player.top < barier.bottom &&
                        player.left < barier.right - this.addLengthBariers &&
                        player.right > barier.left  + this.addLengthBariers &&
                        player.top > barier.top) {

                        result = false;
                    } 
                });
                break;

            case 'left':
                if(player.left < 0) {                
                    return false;
                }

                this.mapObject.bariersColl.forEach((barier) => {
                    
                     if (player.left < barier.right &&
                        player.top < barier.bottom - this.addLengthBariers &&
                        player.bottom > barier.top + this.addLengthBariers &&
                        player.left > barier.left) {

                        result = false;
                    } 
                });
                break;

            case 'right':
                if (player.right > this.canvasWidth) {                    
                    return false;
                }

                this.mapObject.bariersColl.forEach((barier) => {
                    
                     if (player.right > barier.left &&
                        player.top < barier.bottom - this.addLengthBariers &&
                        player.bottom > barier.top + this.addLengthBariers &&
                        player.right < barier.right) {

                        result = false;
                    } 
                });
                break;
        }

        return result;
    }  

    throwWeapon() {       

        const weaponOptions = {
            canvasContext: this.canvasContext,
            startPos: this.player.currentPos,
            offset: this.player.widthSlideOnMap/2,
            dir: this.player.moveDir,
            callbackDel: this.deleteWeapon.bind(this),
            arrNum: this.weapon.length - 1,
            callbackRender: this.renderEntityNew.bind(this)
        };
        
        this.weapon.push(new Weapon(weaponOptions));
        this.lastFlightWeapon = Date.now(); 
        this.weaponCounter--;         
        
    }

    handleInput() {       

        if(this.input.isDown('DOWN') || this.input.isDown('s')) {            
            this.player.animate(); 
            this.canMove('down') && this.player.move('down');            
        }

        if(this.input.isDown('UP') || this.input.isDown('w')) {
            this.player.animate();
            this.canMove('up') && this.player.move('up');
        }

        if(this.input.isDown('LEFT') || this.input.isDown('a')) {
            this.player.animate();
            this.canMove('left') && this.player.move('left');
        }

        if(this.input.isDown('RIGHT') || this.input.isDown('d')) {
            this.player.animate();
            this.canMove('right') && this.player.move('right');
        }

        if(this.input.isDown('SPACE') && (Date.now() - this.lastFlightWeapon > 500)) {
            if(!this.weaponCounter) return;
            
            this.player.isAttack = true;
            this.throwWeapon();                      
        }
    }

    gameOver() {        
        this.isGameOver = true;
        this.bgMusic.pause();
        this.callbackGameOver();        
    }

    getWin() {
        this.isWinner = true;
        this.bgMusic.pause();        
        this.soundWin.play();

        setTimeout(this.callbackWinner, 1000);
    }


    collides(options) {        
        return !(options.obj1.left > options.obj2.right || options.obj1.right <= options.obj2.left ||
                options.obj1.top > options.obj2.bottom || options.obj1.bottom <= options.obj2.top);
    }        

    checkCollisions() {

        const playerBorderObj = this.player.getBorders();

        this.enemies.forEach((enemy, i, enemyArr) => {

            const enemyBorderObj = enemy.getBorders();

            this.weapon.forEach((weapon, j, weaponArr) => {

                const weaponBorderObj = weapon.getBorders();

                const collideEnemyWeapon = {
                    obj1: enemyBorderObj,
                    obj2: weaponBorderObj
                }               

                if(this.collides(collideEnemyWeapon)) {
                    enemy.isDead = true;
                    weaponArr.splice(j, 1);
                    setTimeout(() => {
                        enemyArr.splice(i, 1);
                    }, 1000);
                }

                this.mapObject.bariersColl.forEach((barier) => {

                    const collideWeaponBarier = {
                        obj1: weaponBorderObj,
                        obj2: barier
                    }

                    if(this.collides(collideWeaponBarier)) {
                        weaponArr.splice(j, 1);
                        return;
                    }
                });               
            });

            const collideEnemyPlayer = {
                obj1: playerBorderObj,
                obj2: enemyBorderObj
            }

            if(this.collides(collideEnemyPlayer)) {

                if(enemy.isDead) return;
                enemy.isAttack = true;
                this.player.isDead = true;                

                setTimeout(this.gameOver.bind(this), 500);
            }           
        });

        this.ammunition.forEach((ammUnit, i, ammArr) => {

            const ammUnitBorderObj = ammUnit.getBorders();

            const collideAmmPlayer = {
                obj1: ammUnitBorderObj,
                obj2: playerBorderObj
            }

            if(this.collides(collideAmmPlayer)) {
                ammArr.splice(i, 1);
                this.weaponCounter++;
            }
        });        

        const collidePlayerGoal = {
            obj1: playerBorderObj,
            obj2: this.mapObject.goalObj
        }

        if(this.collides(collidePlayerGoal)) {
            setTimeout(this.getWin.bind(this), 500);
        }       
    }

    update() {
        
        if(this.player.isDead) return;        
        this.handleInput();        
        this.checkCollisions();

        this.weaponCounterDiv.innerHTML = this.weaponCounter;
    }

    init() {
        
        this.createLevelEnemies(this.enemyTuning);
        this.createLevelAmmunition(this.ammunitionTuning)
        this.startGameCircle();

        this.bgMusic.volume = 0.5;
        this.bgMusic.loop = true;
        this.bgMusic.play();
    }
}
