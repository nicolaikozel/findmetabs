const api = require("../api")
const helpers = require("./helpers")

const NUMBER_OF_RANDOM_TRACKS_TO_FETCH = 3

/**
 * Generates a random int (inclusively) given a max value
 * @param {int} max The max random int to return
 * @return {string} The generated random int
 */
function getRandomInt(max) {
	return Math.floor(Math.random() * max + 1)
}

function getRandomTrack(totalTracks) {
	return api.getMySavedTracks({
		limit : 1,
		offset: getRandomInt(totalTracks),
	})
}

function random(req, res) {
	api.getMySavedTracks({
		limit : 1,
		offset: 0
	}).then(
		function (response) {
			const promises = []
			for (let i = 0; i < NUMBER_OF_RANDOM_TRACKS_TO_FETCH; i++) {
				promises.push(getRandomTrack(response.body.total))
			}
			return Promise.all(promises).then(
				function (responses) {
					const responseBody = responses.map(response => {
						return helpers.serializeTrack(response.body.items[0]["track"])
					})
					res.status(200).send(responseBody)
				},
			)
		},
		function (response) {
			res.status(response.statusCode).send()
		},
	)
}

module.exports = random
