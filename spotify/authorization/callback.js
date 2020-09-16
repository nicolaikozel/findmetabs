const querystring = require("querystring")

const api = require("../api")
const config = require("../../config")

function callback(req, res) {
	const { code } = req.query
	api.authorizationCodeGrant(code).then(
		function (data) {
			const { access_token, refresh_token } = data.body
			api.setAccessToken(access_token)
			api.setRefreshToken(refresh_token)

			res.redirect(
				`${config.CLIENT_URL}/suggestions?` +
					querystring.stringify({
						is_authorized: true,
					}),
			)
		},
		function (err) {
			res.redirect("/#/error/invalid token")
		},
	)
}

module.exports = callback
