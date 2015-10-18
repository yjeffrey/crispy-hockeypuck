// SETTINGS
var TIMER_RATE = 7;
var GAME_OVER_LIMIT = 20;

var LEVELS = [
	{
		drop: 0,
		isModChance: 0,
		mod: 3,
		ticksPerTile: 80,
		tilesPerDrop: 1
	},
	{
		drop: 10,
		isModChance: 0.0,
		mod: 3,
		ticksPerTile: 70,
		tilesPerDrop: 1
	},
	{
		drop: 30,
		isModChance: 0.1,
		mod: 3,
		ticksPerTile: 70,
		tilesPerDrop: 1
	},
	{
		drop: 50,
		isModChance: 0.1,
		mod: 4,
		ticksPerTile: 70,
		tilesPerDrop: 1
	},
	{
		drop: 70,
		isModChance: 0.1,
		mod: 4,
		ticksPerTile: 60,
		tilesPerDrop: 1
	},
	{
		drop: 90,
		isModChance: 0.1,
		mod: 4,
		ticksPerTile: 80,
		tilesPerDrop: 2
	},
	{
		drop: 100,
		isModChance: 0.1,
		mod: 5,
		ticksPerTile: 80,
		tilesPerDrop: 2
	},
	{
		drop: 120,
		isModChance: 0.2,
		mod: 5,
		ticksPerTile: 80,
		tilesPerDrop: 2
	},
	{
		drop: 140,
		isModChance: 0.2,
		mod: 5,
		ticksPerTile: 120,
		tilesPerDrop: 3
	},
	{
		drop: 180,
		isModChance: 0.25,
		mod: 5,
		ticksPerTile: 120,
		tilesPerDrop: 3
	},
	{
		drop: 230,
		isModChance: 0.25,
		mod: 5,
		ticksPerTile: 110,
		tilesPerDrop: 3
	}
];

var EVENT_TIMER_NAME = 'event.timer.name';

var ELEMENT_GAME = 'game';
var ELEMENT_GAME_CLOCK = 'game-clock';
var ELEMENT_GAME_BOARD = 'game-board';
var ELEMENT_GAME_LEVEL = 'game-level';

// MAIN
$(document).ready(function(){
	var gameElement = document.getElementById(ELEMENT_GAME);
	var gameClockElement = document.getElementById(ELEMENT_GAME_CLOCK);
	var gameBoardElement = document.getElementById(ELEMENT_GAME_BOARD);
	var gameLevelElement = document.getElementById(ELEMENT_GAME_LEVEL);
	var inputElement = document;
	
	var gameTimer = new Worker('js/game-timer.js');
	gameTimer.postMessage({
		message: 'timer-rate',
		data: TIMER_RATE
	});
	
	var gameClock = new GameClock(gameClockElement);
	var gameBoard = new GameBoard(gameBoardElement);
	var gameLevel = new GameLevel(gameLevelElement);
	var input = new InputProcessor(document);
	
	var game = new Game(gameElement, 
		gameTimer, 
		gameClock,
		gameBoard,
		gameLevel,
		input,
		GAME_OVER_LIMIT,
		LEVELS);
	
	game.start();
});