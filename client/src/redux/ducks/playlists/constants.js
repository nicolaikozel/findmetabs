export const DUCK_NAME = "playlists"

export const PLAYLISTS_URL = "/api/spotify/playlists/"

export const PLAYLIST_URL = playlistId => `${PLAYLISTS_URL}${playlistId}/`

export const PLAYLIST_TRACKS_URL = playlistId => `${PLAYLIST_URL(playlistId)}tracks/`