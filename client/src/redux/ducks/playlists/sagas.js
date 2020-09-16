import api from "../../api"
import { call, put, takeEvery } from "redux-saga/effects"

import slice from "./slice"
import { PLAYLISTS_URL, PLAYLIST_URL, PLAYLIST_TRACKS_URL } from "./constants"

function* getUserPlaylistsSaga({ payload: { options, appendData } }) {
	try {
		const response = yield call(api.get, PLAYLISTS_URL, {
			params: options,
		})
		yield put(
			slice.actions.getUserPlaylistsSuccess(response.data, appendData),
		)
	} catch (e) {
		yield put(slice.actions.getUserPlaylistsFailure(e))
	}
}

function* getPlaylistSaga({ payload: playlistId }) {
	try {
		const response = yield call(api.get, PLAYLIST_URL(playlistId))
		yield put(slice.actions.getPlaylistSuccess(response.data))
	} catch (e) {
		yield put(slice.actions.getPlaylistFailure(e))
	}
}

function* getTracksInPlaylistSaga({
	payload: { playlistId, options, appendData },
}) {
	try {
		const response = yield call(api.get, PLAYLIST_TRACKS_URL(playlistId), {
			params: options,
		})
		yield put(
			slice.actions.getTracksInPlaylistSuccess(response.data, appendData),
		)
	} catch (e) {
		yield put(slice.actions.getTracksInPlaylistFailure(e))
	}
}

function* addTrackToPlaylistSaga({ payload: { playlistId, trackId } }) {
	try {
		const data = { track_id: trackId }
		yield call(api.post, PLAYLIST_TRACKS_URL(playlistId), data)
		yield put(slice.actions.addTrackToPlaylistSuccess())
	} catch (e) {
		yield put(slice.actions.addTrackToPlaylistFailure(e))
	}
}

export default function* playlistsSagaWatcher() {
	yield takeEvery(slice.actions.getUserPlaylists, getUserPlaylistsSaga)
	yield takeEvery(slice.actions.getPlaylist, getPlaylistSaga)
	yield takeEvery(slice.actions.getTracksInPlaylist, getTracksInPlaylistSaga)
	yield takeEvery(slice.actions.addTrackToPlaylist, addTrackToPlaylistSaga)
}
