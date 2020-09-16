const SpotifyWebApi = require("spotify-web-api-node")

const config = require("../config")

const credentials = {
	clientId: "SECRET",
	clientSecret: "SECRET",
	redirectUri: `${config.API_URL}/api/spotify/authorization/callback`,
}
const api = new SpotifyWebApi(credentials)

module.exports = api
