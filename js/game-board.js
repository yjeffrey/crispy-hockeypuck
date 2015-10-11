function GameBoard(element, mod){
	var gamePieces = [];
	var $tileQueue = $(element.firstElementChild.firstElementChild);
	
	this.currentMod = mod;
	
	this.tilesInQueue = function(){
		return gamePieces.length;
	};
	
	this.addPiece = function(){
		var piece = new DirectionBlock(
			Math.floor((Math.random() * this.currentMod)),
			this.currentMod);
		var event = new CustomEvent('add', {detail: piece});
		element.dispatchEvent(event);
		gamePieces.push(piece);
	};
	
	this.popPiece = function(){
		var event = new CustomEvent('pop');
		element.dispatchEvent(event);
		return gamePieces.shift();
	};
	
	this.shiftBy = function(by){
		for(var i = 0; i < gamePieces.length; ++i){
			gamePieces[i].shiftDirection(by, 
				gamePieces[i].mod);
		}
		
		var event = new CustomEvent('shift');
		element.dispatchEvent(event);
	};
	
	this.handleInput = function(inputNumber){
		if(gamePieces.length > 0){
			var piece = gamePieces[0];
			if(piece.number == inputNumber || 
				(inputNumber == piece.mod && piece.number == 0)){
				this.popPiece();
			} else{
				this.addPiece();
			}
			this.shiftBy(inputNumber);
		}
	};
	
	element.addEventListener('add', function(event){
		var number = event.detail.number;
		if(number == 0){
			number = event.detail.mod;
		}
		var newNode = $("<div class='game-tile game-tile-" + number 
			+ "'>"+ number + "</div>");
		$tileQueue.prepend(newNode);
	});
	
	element.addEventListener('pop', function(event){
		var a = $tileQueue.children();
		a = a.last();
		a.remove();
	});
	
	element.addEventListener('shift', function(event){
		var children = $tileQueue.children();
		for(var i = 0; i < children.length; ++i){
			var number = gamePieces[gamePieces.length - 1 - i].number;
			if(number == 0){
				number = gamePieces[gamePieces.length - 1 - i].mod;
			}
			var el = $(children[i]);
			el.text(number);
		}
	});
}