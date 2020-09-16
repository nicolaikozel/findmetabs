const api = require("../api")

function pause(req, res) {
	const options = {
		device_id: req.body.device_id,
	}
	api.pause(options).then(
		function (response) {
			res.status(204).send()
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = pause
