const api = require("../api")

const helpers = require("./helpers")

function get_playlist_details(req, res) {
	const playlistId = req.params.playlistId
	const options = {
		fields: "id,name,images,tracks.total"
	}
	api.getPlaylist(playlistId, options).then(
		function (response) {
			const responseBody = helpers.serializePlaylist(response.body)
			res.status(200).send(responseBody)
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = get_playlist_details
