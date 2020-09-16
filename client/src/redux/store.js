import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"

import rootReducer from "./rootReducer"
import playlistsDuck from "./ducks/playlists"
import songSuggestionsDuck from "./ducks/songSuggestions"
import spotifyPlayerDuck from "./ducks/spotifyPlayer"
import toastNotificationsDuck from "./ducks/toastNotifications"

const sagaMiddleware = createSagaMiddleware()

function configureStore() {
	const composeEnhancers = typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

	const middleware = [sagaMiddleware, thunk]
  
	const enhancers = [applyMiddleware(...middleware)]

	const enhancer = composeEnhancers(...enhancers)

	const store = createStore(
		rootReducer,
		enhancer,
	)

	sagaMiddleware.run(playlistsDuck.sagaWatcher)
	sagaMiddleware.run(songSuggestionsDuck.sagaWatcher)
	sagaMiddleware.run(spotifyPlayerDuck.sagaWatcher)
	sagaMiddleware.run(spotifyPlayerDuck.extraSagas.pollCurrentlyPlayingSongSagaWatcher)
	sagaMiddleware.run(toastNotificationsDuck.sagaWatcher)
	
	return store
}

const store = configureStore()

export default store