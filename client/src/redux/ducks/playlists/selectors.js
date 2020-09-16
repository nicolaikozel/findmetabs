import slice from "./slice"

export const currentPlaylistSelector = state => state[slice.name].get("currentPlaylist")

export const currentPlaylistTracksSelector = state => state[slice.name].get("currentPlaylistTracks")

export const isAddingTrackToPlaylistSelector = state => state[slice.name].get("isAddingTrackToPlaylist")

export const isFetchingPlaylistSelector = state => state[slice.name].get("isFetchingPlaylist")

export const isFetchingPlaylistTracksSelector = state => state[slice.name].get("isFetchingPlaylistTracks")

export const isFetchingMorePlaylistTracksSelector = state => state[slice.name].get("isFetchingMorePlaylistTracks")

export const isLoadingPlaylistsSelector = state => state[slice.name].get("isLoadingPlaylists")

export const isLoadingMorePlaylistsSelector = state => state[slice.name].get("isLoadingMorePlaylists")

export const userPlaylistsSelector = state => state[slice.name].get("userPlaylists")

export const userPlaylistsSelectedPageSelector = state => state[slice.name].get("userPlaylistsSelectedPage")

export const playlistsDuckErrorSelector = state => state[slice.name].get("error")