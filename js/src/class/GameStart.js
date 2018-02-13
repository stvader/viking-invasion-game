import Game from './Game.js';
import {map, playerTuning, enemyTuning, ammunitionTuning} from './../data/level-info.js';

export default class GameStart {
	constructor() {
		this.resetBtn = document.getElementById('reset-btn');
		this.gameOverBlock = document.getElementById('gameover-block');
		this.overlay = document.getElementById('gameover-overlay');
		this.startNewGameBtn = document.getElementById('start-again-btn');
		this.winnerBlock = document.getElementById('winner-block');



		this.resetBtn.addEventListener('click', this.reset.bind(this), false);
		this.startNewGameBtn.addEventListener('click', this.reset.bind(this), false);
	}

	gameOver() {
		if(!this.gameOverBlock.classList.contains('gameover-block--active')) {
            this.gameOverBlock.classList.add('gameover-block--active');
        }

        if(!this.overlay.classList.contains('gameover-overlay--active')) {
            this.overlay.classList.add('gameover-overlay--active');
        }
	}

	getWinner() {
		if(!this.winnerBlock.classList.contains('winner-block--active')) {
            this.winnerBlock.classList.add('winner-block--active');
        }
	}

	hiddenBlocks() {
		if(this.gameOverBlock.classList.contains('gameover-block--active')) {
			this.gameOverBlock.classList.remove('gameover-block--active')
		}

		if(this.overlay.classList.contains('gameover-overlay--active')) {
			this.overlay.classList.remove('gameover-overlay--active')
		}

		if(this.winnerBlock.classList.contains('winner-block--active')) {
			this.winnerBlock.classList.remove('winner-block--active')
		}	
	}

	reset() {		
		this.hiddenBlocks();		
		this.game = null;		
		this.init();
	}

	init() {
		const levelOptions = {
			map: map,
			playerTuning: playerTuning,
			enemyTuning: enemyTuning,
			ammunitionTuning: ammunitionTuning,
			callbackGameOver: this.gameOver.bind(this),
			callbackWinner: this.getWinner.bind(this)

		};	
		
		this.game = new Game(levelOptions);
		this.game.init();
	}
}





