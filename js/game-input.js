function InputProcessor(element){
	
	var _listener;
	
	this.listen = function(listener){
		_listener = function(e){
			var code = e.keyCode;
			if(code > 47 && code < 53){
				listener(code - 48);
			} else if(code > 36 && code < 41){
				listener(code - 37);
			}
			e.preventDefault();
		};
		element.addEventListener('keydown', _listener);
	};
	
	this.stop = function(){
		element.removeEventListener('keydown', _listener);
	};
}