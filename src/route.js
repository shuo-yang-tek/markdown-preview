const path = require('path')
const express = require('express')
const markdown = require('./controllers/markdown')

module.exports = (app, filename) => {
	app.use('/static', express.static(path.resolve(__dirname, '../static')))

	app.use((req, res, next) => {
		req.filename = filename
		next()
	})

	app.get('*', markdown.view)
}
