import slice from "./slice"
import sagaWatcher from "./sagas"
import * as selectors from "./selectors"

const duck = {
	name: slice.name,
	reducer: slice.reducer,
	sagaWatcher: sagaWatcher,
	actions: slice.actions,
	selectors: selectors,
}
export default duck