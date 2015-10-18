function Game(element, 
		timer,
		clock,
		board,
		level,
		input,
		gameOverTileCount,
		levelsData){
	
	var that = this;
	var	curTick = 0;
	var dropNumber = 0;
	
	var ontick = function(e){
		clock.setTimeInMilliseconds(
			clock.getTimeInMilliseconds() + TIMER_RATE);
		clock.updateDisplay();
		
		if(curTick % level.ticksPerTile == 0){
			var nextLevelData = levelsData[level.number + 1];
			if(nextLevelData != null && nextLevelData.drop <= dropNumber){
				loadLevel(level.number + 1, nextLevelData);
			}
			for(var i = 0; i < level.tilesPerDrop; ++i){
				board.addPiece(randomPiece());
			}
			++dropNumber;
		}
		if(board.tilesInQueue() > gameOverTileCount && running){
			// Game Over
			that.stop();
		}
		
		++curTick;
	};
	
	var randomPiece = function(){
		var isModPiece = Math.random() < level.isModChance;
		return new DirectionBlock(
			Math.floor((Math.random() * level.currentMod)),
			level.currentMod,
			isModPiece);
	};
	
	var inputListener = function(input){
		if(input.reset){
			that.start();
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
	
	var loadLevel = function(number, data){
		level.load(number,
			data.mod,
			data.isModChance,
			data.ticksPerTile,
			data.tilesPerDrop);
	};
	
	this.start = function(){
		that.stop();
		board.clearPieces();
		curTick = dropNumber = 0;
		
		loadLevel(0, levelsData[0]);
		
		clock.setTimeInMilliseconds(0);
		clock.updateDisplay();
		
		running = true;
		timer.postMessage({
			message: 'start'
		});
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