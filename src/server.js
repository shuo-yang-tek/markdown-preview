const path = require('path')
const express = require('express')
const expressWs = require('express-ws')
const route = require('./route')
const watcher = require('./watcher')

let serverStarted = false

function startServer(filename, port, host) {
	if( serverStarted )
		return null

	serverStarted = true

	filename = path.isAbsolute(filename) ?
		filename : path.resolve(process.cwd(), filename)

	const app = express()
	app.set('view engine', 'pug')
	app.set('views', path.resolve(__dirname, 'views'))

	const WS = expressWs(app)
	app.ws('*', ws => {
		ws.on('error', () => {})
	})

	route(app, filename)
	watcher(WS, filename)

	app.listen(port, host, () => {
		console.log('server listening')
		console.log(`http://${host}:${port}`)
	})
}

module.exports = {
	startServer,
}
