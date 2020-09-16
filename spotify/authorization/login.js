const api = require("../api")

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
	let text = ""
	const possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length))
	}
	return text
}

function login(req, res) {
	const scopes = [
		"streaming",
		"user-read-private",
		"user-read-email",
		"user-read-playback-state",
		"user-library-read",
		"playlist-read-private",
		"playlist-modify-public",
		"playlist-modify-private",
	]
	const state = generateRandomString(16)
	const authorizeURL = api.createAuthorizeURL(scopes, state)
	res.redirect(authorizeURL)
}

module.exports = login
