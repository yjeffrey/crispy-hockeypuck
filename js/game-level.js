function GameLevel(element){
	
	this.number;
	this.currentMod;
	this.isModChance;
	this.ticksPerTile;
	this.tilesPerDrop;
	
	var updateElement = function(){
	};
		
	this.load = function(number,
		currentMod,
		isModChance,
		ticksPerTile,
		tilesPerDrop){
		this.number = number;
		this.currentMod = currentMod;
		this.isModChance = isModChance;
		this.ticksPerTile = ticksPerTile;
		this.tilesPerDrop = tilesPerDrop;
		
		updateElement();
	};
}