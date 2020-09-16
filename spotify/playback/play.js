const api = require("../api")

function play(req, res) {
	const options = {
		device_id: req.body.device_id,
	}
	const trackId = req.body.track_id
	if (trackId) {
		options.uris = [`spotify:track:${trackId}`]
	}
	api.play(options).then(
		function (response) {
			res.status(204).send()
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = play
