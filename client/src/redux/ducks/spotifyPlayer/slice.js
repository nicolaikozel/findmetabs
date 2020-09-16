import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	currentTrack: null,
	error: null,
	isExpanded: false,
	isPlaying: false,
	spotifyPlayerDeviceId: null,
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		setSpotifyPlayerDeviceId: (state, action) => state.set("spotifyPlayerDeviceId", action.payload),
		playSong: state => state,
		playSongSuccess: (state, action) => state.merge({
			currentTrack: action.payload,
			isExpanded: true,
			isPlaying: true,
		}),
		playSongFailure: (state, action) => state.set("error", action.payload),
		pauseSong: state => state,
		pauseSongSuccess: state => state.set("isPlaying", false),
		pauseSongFailure: (state, action) => state.set("error", action.payload),
		resumeSong: state => state,
		resumeSongSuccess: state => state.set("isPlaying", true),
		resumeSongFailure: (state, action) => state.set("error", action.payload),
		startPollingCurrentlyPlayingSong: state => state,
		stopPollingCurrentlyPlayingSong: state => state,
		pollCurrentlyPlayingSongFailure: (state, action) => state.set("error", action.payload),
		clearCurrentTrack: state => state.merge({ currentTrack: null, isPlaying: false }),
		setPlaybackState: (state, action) => state.set("isPlaying", action.payload),
		expandPlayer: state => state.set("isExpanded", true),
		collapsePlayer: state => state.set("isExpanded", false),
	},
})