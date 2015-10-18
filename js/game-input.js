function InputProcessor(element){
	
	var _listener;
	var ZERO = 47,
		TEN = 57,
		R = 82;
		
	this.listen = function(listener){
		_listener = function(e){
			var code = e.keyCode;
			if(code > ZERO && code < TEN){
				listener({number: code - 48});
				e.preventDefault();
			} else if(code == R) {
				listener({reset: true});
			}
		};
		element.addEventListener('keydown', _listener);
	};
	
	this.stop = function(){
		element.removeEventListener('keydown', _listener);
	};
}