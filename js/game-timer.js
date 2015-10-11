var tick_rate;
var interval;

self.addEventListener('message', function(e){
    switch (e.data.message) {
        case 'start':
			start();
            break;
        case 'timer-rate':
			tick_rate = e.data.data;
            break;
        case 'stop':
            clearInterval(interval);
            break;
    };
}, false);

function start(){
	interval = setInterval(function(){
		self.postMessage('tick');
	}, tick_rate);
}