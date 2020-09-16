import api from "../../api"
import {
	call,
	delay,
	put,
	race,
	select,
	take,
	takeEvery,
} from "redux-saga/effects"

import slice from "./slice"
import { PLAYBACK_STATE_URL, PAUSE_SONG_URL, PLAY_SONG_URL } from "./constants"
import {
	currentTrackSelector,
	spotifyPlayerDeviceIdSelector,
} from "./selectors"

const POLL_PLAYBACK_STATE_DELAY = 2500

function* playSongSaga({ payload: track }) {
	try {
		const deviceId = yield select(spotifyPlayerDeviceIdSelector)
		const data = { device_id: deviceId, track_id: track.get("id") }
		yield call(api.put, PLAY_SONG_URL, data)
		yield put(slice.actions.playSongSuccess(track))
		yield put(slice.actions.startPollingCurrentlyPlayingSong())
	} catch (e) {
		yield put(slice.actions.playSongFailure(e))
	}
}

function* pauseSongSaga() {
	try {
		const deviceId = yield select(spotifyPlayerDeviceIdSelector)
		yield call(api.put, PAUSE_SONG_URL, { device_id: deviceId })
		yield put(slice.actions.pauseSongSuccess())
	} catch (e) {
		yield put(slice.actions.pauseSongFailure(e))
	}
}

function* resumeSongSaga() {
	try {
		const deviceId = yield select(spotifyPlayerDeviceIdSelector)
		yield call(api.put, PLAY_SONG_URL, { device_id: deviceId })
		yield put(slice.actions.resumeSongSuccess())
	} catch (e) {
		yield put(slice.actions.resumeSongFailure(e))
	}
}

function* pollCurrentlyPlayingSongSaga() {
	let INACTIVITY_DELAY = 0
	let INACTIVITY_LOOP_COUNT = 0
	while (true) {
		try {
			const response = yield call(api.get, PLAYBACK_STATE_URL)
			const currentTrack = yield select(currentTrackSelector)
			const currentDeviceId = yield select(spotifyPlayerDeviceIdSelector)
			if (
				currentTrack.get("id") !== response.data.track.id ||
				currentDeviceId !== response.data.device.id
			) {
				yield put(slice.actions.collapsePlayer())
				yield delay(250)
				yield put(slice.actions.clearCurrentTrack())
				yield put(slice.actions.stopPollingCurrentlyPlayingSong())
				break
			}
			yield put(slice.actions.setPlaybackState(response.data.is_playing))
			if (!response.data.is_playing) {
				INACTIVITY_DELAY = Math.min(
					Math.pow(2, INACTIVITY_LOOP_COUNT) * 1,
					7500,
				)
			} else {
				INACTIVITY_DELAY = 0
			}
			INACTIVITY_LOOP_COUNT += 1
		} catch (e) {
			yield put(slice.actions.pollCurrentlyPlayingSongFailure(e))
			yield put(slice.actions.stopPollingCurrentlyPlayingSong())
			break
		} finally {
			yield delay(POLL_PLAYBACK_STATE_DELAY + INACTIVITY_DELAY)
		}
	}
}

export function* pollCurrentlyPlayingSongSagaWatcher() {
	while (true) {
		yield take(slice.actions.startPollingCurrentlyPlayingSong)
		yield race([
			call(pollCurrentlyPlayingSongSaga),
			take(slice.actions.stopPollingCurrentlyPlayingSong),
		])
	}
}

export default function* spotifyPlayerSagaWatcher() {
	yield takeEvery(slice.actions.playSong, playSongSaga)
	yield takeEvery(slice.actions.pauseSong, pauseSongSaga)
	yield takeEvery(slice.actions.resumeSong, resumeSongSaga)
}
