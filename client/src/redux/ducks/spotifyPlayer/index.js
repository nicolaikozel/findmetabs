import slice from "./slice"
import sagaWatcher, { pollCurrentlyPlayingSongSagaWatcher } from "./sagas"
import * as selectors from "./selectors"

const duck = {
	name: slice.name,
	reducer: slice.reducer,
	sagaWatcher: sagaWatcher,
	extraSagas: { pollCurrentlyPlayingSongSagaWatcher },
	actions: slice.actions,
	selectors: selectors,
}
export default duck