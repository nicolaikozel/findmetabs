import Immutable from "immutable"
import { createSlice } from "@reduxjs/toolkit"

import { DUCK_NAME } from "./constants"

const initialState = Immutable.fromJS({
	currentPlaylist: null,
	currentPlaylistTracks: null,
	error: null,
	isAddingTrackToPlaylist: false,
	isFetchingPlaylist: false,
	isFetchingPlaylistTracks: false,
	isFetchingMorePlaylistTracks: false,
	isLoadingPlaylists: false,
	isLoadingMorePlaylists: false,
	userPlaylists: Immutable.List(),
})

export default createSlice({
	name: DUCK_NAME,
	initialState: initialState,
	reducers: {
		getUserPlaylists: {
			prepare: (options, appendData) => {
				return {
					payload: {
						options,
						appendData,
					},
				}
			},
			reducer: (state, action) => {
				if (action.payload.appendData) {
					return state.set("isLoadingMorePlaylists", true)
				}
				return state.set("isLoadingPlaylists", true)
			}
		},
		getUserPlaylistsSuccess: {
			prepare: (data, appendData) => {
				return {
					payload: {
						data,
						appendData,
					}
				}
			},
			reducer: (state, action) => {
				if (action.payload.appendData) {
					return state.merge({
						isLoadingMorePlaylists: false,
						userPlaylists: Immutable.fromJS({
							...action.payload.data,
							items: state.get("userPlaylists").get("items").concat(Immutable.fromJS(action.payload.data.items)),
						}),
					})
				}
				return state.merge({
					isLoadingPlaylists: false,
					userPlaylists: Immutable.fromJS(action.payload.data),
				})
			},
		},
		getUserPlaylistsFailure: (state, action) => state.merge({
			error: action.payload,
			isLoadingPlaylists: false,
			userPlaylists: Immutable.Map(),
		}),
		addTrackToPlaylist: {
			prepare: (playlistId, trackId) => {
				return {
					payload: {
						playlistId,
						trackId,
					}
				}
			},
			reducer: state => state.set("isAddingTrackToPlaylist", true),
		},
		addTrackToPlaylistSuccess: state => state.set("isAddingTrackToPlaylist", false),
		addTrackToPlaylistFailure: (state, action) => state.merge({
			error: action.payload,
			isAddingTrackToPlaylist: false,
		}),
		getPlaylist: state => state.merge({ isFetchingPlaylist: true }),
		getPlaylistSuccess: (state, action) => state.merge({
			currentPlaylist: Immutable.fromJS(action.payload),
			isFetchingPlaylist: false,
		}),
		getPlaylistFailure: (state, action) => state.merge({
			error: action.payload,
			isFetchingPlaylist: false,
		}),
		getTracksInPlaylist: {
			prepare: (playlistId, options, appendData) => {
				return {
					payload: {
						playlistId,
						options,
						appendData,
					}
				}
			},
			reducer: (state, action) => {
				if (action.payload.appendData) {
					return state.set("isFetchingMorePlaylistTracks", true)
				}
				return state.set("isFetchingPlaylistTracks", true)
			},
		},
		getTracksInPlaylistSuccess: {
			prepare: (data, appendData) => {
				return {
					payload: {
						data,
						appendData,
					}
				}
			},
			reducer: (state, action) => {
				if (action.payload.appendData) {
					return state.merge({
						currentPlaylistTracks: Immutable.fromJS({
							...action.payload.data,
							items: state.get("currentPlaylistTracks").get("items").concat(Immutable.fromJS(action.payload.data.items)),
						}),
						isFetchingMorePlaylistTracks: false,
					})
				}
				return state.merge({
					currentPlaylistTracks: Immutable.fromJS(action.payload.data),
					isFetchingPlaylistTracks: false,
				})
			},	
		},
		getTracksInPlaylistFailure: (state, action) => state.merge({
			error: action.payload,
			isFetchingPlaylistTracks: false,
		})
	},
})