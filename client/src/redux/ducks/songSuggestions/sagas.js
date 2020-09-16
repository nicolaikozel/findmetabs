import api from "../../api"
import { call, put, takeEvery } from "redux-saga/effects"

import slice from "./slice"
import { RANDOM_TRACKS_URL } from "./constants"

function* getRandomSongSuggestionsSaga() {
	try {
		const response = yield call(api.get, RANDOM_TRACKS_URL)
		yield put(slice.actions.getRandomSongSuggestionsSuccess(response.data))
	} catch (e) {
		yield put(slice.actions.getRandomSongSuggestionsFailure(e))
	}
}

export default function* songSuggestionsSagaWatcher() {
	yield takeEvery(slice.actions.getRandomSongSuggestions, getRandomSongSuggestionsSaga)
}
