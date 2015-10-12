function Game(element, 
		timer,
		clock,
		board,
		input,
		settings){
	
	var curTick = 0;
	var currentMod = settings.mod;
	var ticksPerTile = settings.ticksPerTile;
	var gameOverTileCount = settings.gameOverTileCount;
	var that = this;
	var stopped;
	
	var ontick = function(e){
		clock.setTimeInMilliseconds(
			clock.getTimeInMilliseconds() + TIMER_RATE);
		clock.updateDisplay();
		
		if(curTick == 0){
			board.addPiece(randomPiece());
		}
		if(board.tilesInQueue() > gameOverTileCount && running){
			// Game Over
			that.stop();
		}
		
		++curTick;
		curTick %= ticksPerTile;
	};
	
	var randomPiece = function(){
		var isModPiece = Math.random() > 0.9;
		console.log(isModPiece);
		return new DirectionBlock(
			Math.floor((Math.random() * currentMod)),
			currentMod,
			isModPiece);
	};
	
	var inputListener = function(input){
		var isGoodInput = board.handleInput(input);
		if(isGoodInput){
			var piece = board.popPiece();
			if(piece.isModPiece){
				board.shiftBy(piece.number);
			}
		} else {
			board.addPiece(randomPiece());
		}
	};
	
	this.start = function(){
		running = true;
		timer.postMessage({
			message: 'start'
		});
		input.listen(inputListener);
	
		clock.setTimeInMilliseconds(0);
		clock.updateDisplay();
	};
	
	this.stop = function(){
		running = false;
		timer.postMessage({
			message: 'stop'
		});
		input.stop();
	};
	
	timer.onmessage = ontick;
}