function Game(element, 
		timer,
		clock,
		board,
		input,
		settings){
	
	var that = this;
	var	curTick = 0;
	
	var ontick = function(e){
		clock.setTimeInMilliseconds(
			clock.getTimeInMilliseconds() + TIMER_RATE);
		clock.updateDisplay();
		
		if(curTick%that.ticksPerTile == 0){
			for(var i = 0; i < that.tilesPerDrop; ++i){
				board.addPiece(randomPiece());
			}
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
		console.log(input);
		if(input.reset){
			that.reset();
		}
		else if(running && input.number && board.useInput(input.number)){
			var piece = board.popPiece();
			if(piece.isModPiece){
				board.shiftBy(piece.number);
			}
		} else {
			board.addPiece(randomPiece());
		}
	};
	
	this.start = function(){
		curTick = 0;
		this.currentMod = settings.mod;
		this.gameOverTileCount = settings.gameOverTileCount;
		this.isModChance = settings.isModChance;
		this.ticksPerTile = settings.ticksPerTile;
		this.tilesPerDrop = settings.tilesPerDrop;
		
		running = true;
		timer.postMessage({
			message: 'start'
		});
	
		clock.setTimeInMilliseconds(0);
		clock.updateDisplay();
	};
	
	this.reset = function(){
		that.stop();
		board.clearPieces();
		that.start();
	};
	
	this.stop = function(){
		running = false;
		timer.postMessage({
			message: 'stop'
		});
	};
	
	input.listen(inputListener);
	timer.onmessage = ontick;
}