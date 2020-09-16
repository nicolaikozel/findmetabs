import slice from "./slice"

export const spotifyPlayerDeviceIdSelector = state => state[slice.name].get("spotifyPlayerDeviceId")

export const currentTrackSelector = state => state[slice.name].get("currentTrack")

export const isExpandedSelector = state => state[slice.name].get("isExpanded")

export const isPlayingSelector = state => state[slice.name].get("isPlaying")

export const volumeSelector = state => state[slice.name].get("volume")