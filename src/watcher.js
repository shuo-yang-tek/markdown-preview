const chokidar = require('chokidar')

module.exports = (WS, filename) => {
	const watcher = chokidar.watch(filename, {
		ignoreInitial: true,
	})

	const broadcastReload = () => WS.getWss().clients.forEach(ws => ws.send('reload'))
	watcher.on('change', broadcastReload)
	watcher.on('add', broadcastReload)

	watcher.on('unlink', () => {
		console.error(`${filename} has been removed`)
		process.exit(1)
	})
}
