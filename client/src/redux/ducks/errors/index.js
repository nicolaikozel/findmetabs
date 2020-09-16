import slice from "./slice"
import * as selectors from "./selectors"

const duck = {
	name: slice.name,
	reducer: slice.reducer,
	actions: slice.actions,
	selectors: selectors,
}
export default duck