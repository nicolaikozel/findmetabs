import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Router, Switch, Route } from "react-router-dom"

import GlobalStyles from "./globalStyles"
import sessionStorageHelpers from "./helpers/sessionStorageHelpers"
import About from "./containers/About"
import Error from "./containers/Error"
import ErrorBoundary from "./containers/ErrorBoundary"
import Suggestions from "./containers/Suggestions"
import Landing from "./containers/Landing"
import Playlists from "./containers/Playlists"
import PlaylistDetails from "./containers/PlaylistDetails"
import SpotifyPlayer from "./containers/SpotifyPlayer"
import ToastNotification from "./containers/ToastNotification"
import errorsDuck from "./redux/ducks/errors"
import spotifyAuthorizationDuck from "./redux/ducks/spotifyAuthorization"

import history from "./history"

export class UnconnectedApp extends React.PureComponent {
	static propTypes = {
		currentNotification: PropTypes.object,
		error: PropTypes.string,
		setSpotifyAccessStatus: PropTypes.func.isRequired,
	}

	static defaultProps = {
		currentNotification: null,
		error: null,
	}

	constructor(props) {
		super(props)
		// Share authorization state across tabs
		window.addEventListener("storage", event => {
			const isSpotifyAccessAuthorized = sessionStorageHelpers.isSpotifyAccessAuthorized()
			const spotifyAccessStatus = sessionStorageHelpers.getSpotifyAccessStatus()
			if (
				event.key === "requestAuthorizationStatus" &&
				spotifyAccessStatus !== null
			) {
				window.localStorage.setItem(
					"shareAuthorizationStatus",
					spotifyAccessStatus,
				)
				window.localStorage.removeItem("shareAuthorizationStatus")
			}
			if (
				event.key === "shareAuthorizationStatus" &&
				!isSpotifyAccessAuthorized
			) {
				sessionStorageHelpers.setSpotifyAccessStatus(event.newValue)
				this.props.setSpotifyAccessStatus(
					sessionStorageHelpers.getSpotifyAccessStatus(),
				)
			}
		})
	}

	componentDidMount() {
		window.localStorage.setItem(
			"requestAuthorizationStatus",
			Date.now().toString(),
		)
		window.localStorage.removeItem("requestAuthorizationStatus")
	}

	renderPage() {
		if (this.props.error) {
			return (
				<Router history={history}>
					<Error />
				</Router>
			)
		}
		return (
			<ErrorBoundary>
				<ToastNotification />
				<Router history={history}>
					<Switch>
						<Route
							exact
							path="/"
							component={Landing}
						/>
						<Route
							path="/suggestions"
							component={Suggestions}
						/>
						<Route
							exact
							path="/playlists"
							component={Playlists}
						/>
						<Route
							path="/playlists/:playlistId"
							component={PlaylistDetails}
						/>
						<Route path="/about" component={About} />
					</Switch>
				</Router>
				<SpotifyPlayer />
			</ErrorBoundary>
		)
	}

	render() {
		return (
			<>
				<GlobalStyles />
				{this.renderPage()}
			</>
		)
	}
}

const mapStateToProps = state => ({
	error: errorsDuck.selectors.errorSelector(state),
})

const mapDispatchToProps = {
	setSpotifyAccessStatus:
		spotifyAuthorizationDuck.actions.setSpotifyAccessStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp)
