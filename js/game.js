function Game(element, 
		timer,
		clock,
		board,
		input,
		settings){
	
	var curTick = 0;
	var that = this;
	var stopped;
	
	this.currentMod = settings.mod;
	this.gameOverTileCount = settings.gameOverTileCount;
	this.isModChance = settings.isModChance;
	this.ticksPerTile = settings.ticksPerTile;
	
	
	var ontick = function(e){
		clock.setTimeInMilliseconds(
			clock.getTimeInMilliseconds() + TIMER_RATE);
		clock.updateDisplay();
		
		if(curTick%that.ticksPerTile == 0){
			board.addPiece(randomPiece());
		}
		if(board.tilesInQueue() > that.gameOverTileCount && running){
			// Game Over
			that.stop();
		}
		
		++curTick;
	};
	
	var randomPiece = function(){
		var isModPiece = Math.random() < that.isModChance;
		return new DirectionBlock(
			Math.floor((Math.random() * that.currentMod)),
			that.currentMod,
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