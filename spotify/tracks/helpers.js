function serializeTrack(track) {
	const image = track.album.images[0]
	return {
		artist: track.artists[0].name,
		artwork: image ? image.url : null,
		album: track.album.name,
		id: track.id,
		title: track.name,
	}
}

module.exports = {
	serializeTrack,
}