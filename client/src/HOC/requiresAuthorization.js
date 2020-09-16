import React from "react"  
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import sessionStorageHelpers from "../helpers/sessionStorageHelpers"
import spotifyAuthorizationDuck from "../redux/ducks/spotifyAuthorization"
import { SpotifyAccessStatus } from "../constants/spotify"

export default function (WrappedComponent) {  
	class RequiresAuthorization extends React.Component {		
		static propTypes = {
			history: PropTypes.object.isRequired,
			isSpotifyAccessAuthorized: PropTypes.bool,
			setSpotifyAccessStatus: PropTypes.func.isRequired,
		}

		static defaultProps = {
			isSpotifyAccessAuthorized: null,
		}

		componentDidMount() {
			// If user is not authorized, check URL params and
			// update session storage / redux state accordingly. 
        	if (!this.props.isSpotifyAccessAuthorized) {
				const urlParams = new URLSearchParams(window.location.search)
				// eslint-disable-next-line no-extra-boolean-cast
				if (Boolean(urlParams.get("is_authorized"))) {
					sessionStorageHelpers.setSpotifyAccessStatus(SpotifyAccessStatus.ALLOWED)
					this.props.setSpotifyAccessStatus(SpotifyAccessStatus.ALLOWED)
				} else {
					this.props.history.push("/")
        		}
        	}
		}

		render() {
        	return this.props.isSpotifyAccessAuthorized ? <WrappedComponent {...this.props} /> : null
		}
	}

	const mapStateToProps = (state) => {
		return {
			isSpotifyAccessAuthorized: spotifyAuthorizationDuck.selectors.isSpotifyAccessAuthorizedSelector(state),
		}
	}

	const mapDispatchToProps = {
		setSpotifyAccessStatus: spotifyAuthorizationDuck.actions.setSpotifyAccessStatus,
	}

	return connect(mapStateToProps, mapDispatchToProps)(withRouter(RequiresAuthorization))
}