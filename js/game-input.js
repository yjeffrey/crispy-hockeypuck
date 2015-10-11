function InputProcessor(element){
	
	this.listen = function(listener){
		element.onkeypress = function(e){
			var code = e.keyCode - 48;
			if(code > 0 && code < 5){
				listener(code);
			}
		};
	};
	
	this.stop = function(){
		element.onkeypress = null;
	};
}