const api = require("../api")

const helpers = require("./helpers")

function playlists(req, res) {
	const options = { 
		offset: req.query.offset,
		limit: req.query.limit,
	}
	api.getUserPlaylists(options).then(
		function (response) {
			const responseBody = {
				limit: response.body.limit,
				next: response.body.next,
				offset: response.body.offset,
				previous: response.body.previous,
				total: response.body.total,
			}
			responseBody.items = response.body.items.map(playlist => {
				return helpers.serializePlaylist(playlist)
			})
			res.status(200).send(responseBody)
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = playlists
