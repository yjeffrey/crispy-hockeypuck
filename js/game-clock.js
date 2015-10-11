function GameClock(element){
	var time = 0;
	
	this.updateDisplay = function(){
		element.innerHTML = Math.round(time / 1000);
	};
	
	this.getTimeInMilliseconds = function(){
		return time;
	};
	
	this.getTimeInSeconds = function(){
		return Math.round(time);
	};
	
	this.setTimeInMilliseconds = function(timeInMilliseconds){
		time = timeInMilliseconds;
	};
}