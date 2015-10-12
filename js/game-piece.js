function DirectionBlock(number, mod, isModPiece){
	this.number = number;
	this.mod = mod;
	this.isModPiece = isModPiece;
	
	this.setNumber = function(newNumber){
		this.number = newNumber;
	};
	
	this.shiftDirection = function(shiftNumber, mod){
		this.number += mod + shiftNumber;
		this.number %= mod;
	};
}