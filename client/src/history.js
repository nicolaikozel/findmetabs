// history.js
import { createBrowserHistory } from "history"

import store from "./redux/store"
import errorsDuck from "./redux/ducks/errors"

const history = createBrowserHistory()

history.listen((location) => {
	store.dispatch(errorsDuck.actions.resetError())
})

export default history