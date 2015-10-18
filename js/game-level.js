function GameLevel(element){
	
	var that = this;
	
	this.number;
	this.currentMod;
	this.isModChance;
	this.ticksPerTile;
	this.tilesPerDrop;
	
	var levelElement = $(element).find('#current-level')[0];
	var modElement = $(element).find('#current-mod')[0];
	
	var updateElement = function(){
		levelElement.innerHTML = that.number + 1;
		modElement.innerHTML = that.currentMod;
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