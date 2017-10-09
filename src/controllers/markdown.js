const fs = require('fs')
const marked = require('marked')
const pygm = require('pygmentize-bundled')

marked.setOptions({
	highlight: (code, lang, callback) => {
		pygm({
			lang,
			format: 'html',
		}, code, (err, result) => {
			callback(err, result.toString())
		})
	},
	breaks: true,
	smartpants: true
})

function view(req, res) {
	fs.readFile(req.filename, (err, data) => {
		if( err )
			return res.status(404).send(err.toString())

		marked(data.toString(), (err, content) => {
			if( err )
				return res.status(500).send(err.toString())

			res.render('index', { html: content })
		})
	})
}

module.exports = {
	view,
}
