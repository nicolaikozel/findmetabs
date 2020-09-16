const api = require("../api")

function add_track_to_playlist(req, res) {
	const playlistId = req.params.playlistId
	const tracks = [`spotify:track:${req.body.track_id}`]
	api.addTracksToPlaylist(playlistId, tracks).then(
		function (response) {
			res.status(204).send()
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = add_track_to_playlist
