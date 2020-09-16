const api = require("../api")

function refresh_token(req, res) {
	api.refreshAccessToken().then(
		function (response) {
			const accessToken = response.body["access_token"]
			api.setAccessToken(accessToken)
			res.status(200).send({ access_token: accessToken })
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = refresh_token
