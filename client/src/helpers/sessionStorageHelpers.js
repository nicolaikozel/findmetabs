import { SpotifyAccessStatus } from "../constants/spotify"

const SPOTIFY_ACCESS_STATUS_KEY = "SPOTIFY_ACCESS_STATUS"

function getSpotifyAccessStatus() {
	return window.sessionStorage.getItem(SPOTIFY_ACCESS_STATUS_KEY)
}

function setSpotifyAccessStatus(status) {
	window.sessionStorage.setItem(SPOTIFY_ACCESS_STATUS_KEY, status)
}

function isSpotifyAccessAuthorized() {
	return getSpotifyAccessStatus() === SpotifyAccessStatus.ALLOWED
}

export default {
	isSpotifyAccessAuthorized,
	getSpotifyAccessStatus,
	setSpotifyAccessStatus,
}