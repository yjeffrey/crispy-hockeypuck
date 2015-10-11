function DirectionBlock(number, mod){
	this.number = number;
	this.mod = mod;
	
	this.setNumber = function(newNumber){
		this.number = newNumber;
	};
	
	this.shiftDirection = function(shiftNumber, mod){
		this.number += mod + shiftNumber;
		this.number %= mod;
	};
}