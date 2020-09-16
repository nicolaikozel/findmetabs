function serializePlaylist(playlist) {
	const image = playlist.images[0]
	return {
		artwork: image ? image.url : null,
		id: playlist.id,
		name: playlist.name,
		track_count: playlist.tracks.total,
	}
}

module.exports = {
	serializePlaylist,
}