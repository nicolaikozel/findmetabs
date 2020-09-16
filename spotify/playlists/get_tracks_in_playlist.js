const api = require("../api")

const trackHelpers = require("../tracks/helpers")

function get_tracks_in_playlist(req, res) {
	const playlistId = req.params.playlistId
	const options = {
		offset: req.query.offset,
		limit: req.query.limit,
	}
	api.getPlaylistTracks(playlistId, options).then(
		function (response) {
			const responseBody = {
				limit: response.body.limit,
				next: response.body.next,
				offset: response.body.offset,
				previous: response.body.previous,
				total: response.body.total,
			}
			responseBody.items = response.body.items.map(item => {
				return trackHelpers.serializeTrack(item.track)
			})
			res.status(200).send(responseBody)
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = get_tracks_in_playlist
