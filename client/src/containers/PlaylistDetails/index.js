import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { MdArrowBack } from "react-icons/md"
import { withRouter } from "react-router-dom"

import playlistsDuck from "../../redux/ducks/playlists"
import requiresAuthorization from "../../HOC/requiresAuthorization"
import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import LoadingSplash from "../../components/LoadingSplash"
import TrackList from "../../components/TrackList"
import {
	SectionFullHeight,
	SectionContainer,
	SectionTitle,
	SectionTitleContainer,
} from "../../components/Layout"

import { BackButton } from "./PlaylistDetails.styles"

class PlaylistDetails extends React.PureComponent {
	static propTypes = {
		currentPlaylist: PropTypes.object,
		currentPlaylistTracks: PropTypes.object,
		getPlaylist: PropTypes.func.isRequired,
		getTracksInPlaylist: PropTypes.func.isRequired,
		history: PropTypes.object.isRequired,
		isFetchingPlaylist: PropTypes.bool.isRequired,
		isFetchingPlaylistTracks: PropTypes.bool.isRequired,
		isFetchingMorePlaylistTracks: PropTypes.bool.isRequired,
		match: PropTypes.shape({
			params: PropTypes.object.isRequired,
		}).isRequired,
	}

	static defaultProps = {
		currentPlaylist: null,
		currentPlaylistTracks: null,
	}

	componentDidMount() {
		this.props.getPlaylist(this.PlaylistId)
		this.props.getTracksInPlaylist(this.PlaylistId)
	}

	get PlaylistId() {
		return this.props.match.params.playlistId
	}

	getNextPageOfTracks = () => {
		this.props.getTracksInPlaylist(
			this.PlaylistId,
			{
				offset:
					this.props.currentPlaylistTracks.get("offset") +
					this.props.currentPlaylistTracks.get("limit"),
			},
			true,
		)
	}

	renderBackButton() {
		return (
			<BackButton onClick={() => this.props.history.push("/playlists")}>
				<MdArrowBack />
				Back to Playlists
			</BackButton>
		)
	}

	renderContent() {
		if (
			this.props.isFetchingPlaylist ||
			this.props.isFetchingPlaylistTracks
		)
			return <LoadingSplash />
		return (
			<>
				<SectionContainer maxWidth="1040px">
					{this.renderBackButton()}
					<SectionTitleContainer>
						<SectionTitle>
							{this.props.currentPlaylist?.get("name")}
						</SectionTitle>
					</SectionTitleContainer>
					<TrackList
						allTracksFetched={
							this.props.currentPlaylistTracks?.get("total") <=
							this.props.currentPlaylistTracks?.get("items").size
						}
						isFetching={this.props.isFetchingMorePlaylistTracks}
						tracks={this.props.currentPlaylistTracks
							?.get("items")
							.toArray()}
						onFetch={this.getNextPageOfTracks}
					/>
				</SectionContainer>
			</>
		)
	}

	render() {
		return <SectionFullHeight>{this.renderContent()}</SectionFullHeight>
	}
}

const mapStateToProps = state => ({
	currentPlaylist: playlistsDuck.selectors.currentPlaylistSelector(state),
	currentPlaylistTracks: playlistsDuck.selectors.currentPlaylistTracksSelector(
		state,
	),
	isFetchingPlaylist: playlistsDuck.selectors.isFetchingPlaylistSelector(
		state,
	),
	isFetchingPlaylistTracks: playlistsDuck.selectors.isFetchingPlaylistTracksSelector(
		state,
	),
	isFetchingMorePlaylistTracks: playlistsDuck.selectors.isFetchingMorePlaylistTracksSelector(
		state,
	),
})

const mapDispatchToProps = {
	getPlaylist: playlistsDuck.actions.getPlaylist,
	getTracksInPlaylist: playlistsDuck.actions.getTracksInPlaylist,
}

export default requiresAuthorization(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(withRouter(withHeaderAndFooter(PlaylistDetails))),
)
