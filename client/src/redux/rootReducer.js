import { combineReducers } from "redux"

import errorsDuck from "./ducks/errors"
import playlistsDuck from "./ducks/playlists"
import spotifyAuthorizationDuck from "./ducks/spotifyAuthorization"
import songSuggestionsDuck from "./ducks/songSuggestions"
import spotifyPlayerDuck from "./ducks/spotifyPlayer"
import toastNotificationsDuck from "./ducks/toastNotifications"

export default combineReducers({
	[errorsDuck.name]: errorsDuck.reducer,
	[playlistsDuck.name]: playlistsDuck.reducer,
	[spotifyAuthorizationDuck.name]: spotifyAuthorizationDuck.reducer,
	[songSuggestionsDuck.name]: songSuggestionsDuck.reducer,
	[spotifyPlayerDuck.name]: spotifyPlayerDuck.reducer,
	[toastNotificationsDuck.name]: toastNotificationsDuck.reducer,
})
