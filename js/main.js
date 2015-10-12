var IS_MOD_CHANCE = 0.10;
var GAME_OVER_LIMIT = 20;
var STARTING_MOD = 4;
var TICKS_PER_TILE = 40;
var TIMER_RATE = 10;

var EVENT_TIMER_NAME = 'event.timer.name';

var ELEMENT_GAME = 'game';
var ELEMENT_GAME_CLOCK = 'game-clock';
var ELEMENT_GAME_BOARD = 'game-board';

var settings = {
	isModChance: IS_MOD_CHANCE,
	ticksPerTile: TICKS_PER_TILE,
	gameOverTileCount: GAME_OVER_LIMIT,
	mod: STARTING_MOD
};

$(document).ready(function(){
	var gameElement = document.getElementById(ELEMENT_GAME);
	var gameClockElement = document.getElementById(ELEMENT_GAME_CLOCK);
	var gameBoardElement = document.getElementById(ELEMENT_GAME_BOARD);
	var inputElement = document;
	
	var gameTimer = new Worker('js/game-timer.js');
	gameTimer.postMessage({
		message: 'timer-rate',
		data: TIMER_RATE
	});
	
	var gameClock = new GameClock(gameClockElement);
	var gameBoard = new GameBoard(gameBoardElement);
	var input = new InputProcessor(document);
	
	var game = new Game(gameElement, 
		gameTimer, 
		gameClock,
		gameBoard,
		input,
		settings);
	
	game.start();
});