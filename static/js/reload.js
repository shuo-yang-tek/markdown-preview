(function() {
	const ws = new WebSocket('ws://' + location.host)
	ws.onmessage = function(msg) {
		if( msg === 'reload' )
			location.reload()
	}
})()
