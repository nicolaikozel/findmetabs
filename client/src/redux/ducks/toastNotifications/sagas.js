import { delay, put, takeEvery } from "redux-saga/effects"

import slice from "./slice"

function* showNotificationSaga() {
	yield put(slice.actions.setIsShowingNotification(true))
	yield delay(4000)
	yield put(slice.actions.setIsShowingNotification(false))
}

export default function* toastNotificationsSagaWatcher() {
	yield takeEvery(slice.actions.showNotification, showNotificationSaga)
}
