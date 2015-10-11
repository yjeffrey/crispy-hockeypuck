function Game(element, 
		timer,
		clock,
		board,
		input){
	
	var curTick = 0;
	var ticksPerTile = 40;
	var that = this;
	
	var ontick = function(e){
		clock.setTimeInMilliseconds(
			clock.getTimeInMilliseconds() + TIMER_RATE);
		clock.updateDisplay();
		
		if(curTick == 0){
			board.addPiece();
		}
		if(board.tilesInQueue() == 20){
			alert("game over");
			that.stop();
		}
		
		++curTick;
		curTick %= ticksPerTile;
	};
	
	var inputListener = function(input){
		board.handleInput(input);
	};
	
	this.start = function(){
		timer.postMessage({
			message: 'start'
		});
		input.listen(inputListener);
	
		clock.setTimeInMilliseconds(0);
		clock.updateDisplay();
	};
	
	this.stop = function(){
		timer.postMessage({
			message: 'stop'
		});
		input.stop();
	};
	
	timer.onmessage = ontick;
}