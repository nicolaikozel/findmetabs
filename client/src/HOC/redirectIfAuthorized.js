import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import spotifyAuthorizationDuck from "../redux/ducks/spotifyAuthorization"

export default function (WrappedComponent) {  
	class RedirectIfAuthorized extends React.Component {		
		static propTypes = {
			isSpotifyAccessAuthorized: PropTypes.bool,
		}
        
        static defaultProps = {
        	isSpotifyAccessAuthorized: null,
        }

        render() {
        	return this.props.isSpotifyAccessAuthorized ? <Redirect to="/suggestions" /> : <WrappedComponent {...this.props} />
        }
	}
    
	const mapStateToProps = (state) => {
		return {
			isSpotifyAccessAuthorized: spotifyAuthorizationDuck.selectors.isSpotifyAccessAuthorizedSelector(state),
		}
	}
    
	return connect(mapStateToProps)(RedirectIfAuthorized)
}