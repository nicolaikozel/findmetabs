const api = require("../api")
const trackHelpers = require("../tracks/helpers")
const playbackHelpers = require("./helpers")

function state(req, res) {
	api.getMyCurrentPlaybackState().then(
		function (response) {
			const responseBody = {
				device: playbackHelpers.serializeDevice(response.body.device),
				progress_ms: response.body.progress_ms,
				is_playing: response.body.is_playing,
				track: trackHelpers.serializeTrack(response.body.item),
			}
			res.status(200).send(responseBody)
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = state
