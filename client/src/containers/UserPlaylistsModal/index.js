import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { FaCheckCircle } from "react-icons/fa"
import { Waypoint } from "react-waypoint"
import ReactLoading from "react-loading"

import playlistsDuck from "../../redux/ducks/playlists"
import toastNotificationsDuck from "../../redux/ducks/toastNotifications"
import Button from "../../components/Button"
import Modal from "../../components/Modal"
import LoadingSplash from "../../components/LoadingSplash"
import SearchInput from "../../components/SearchInput"

import {
	Badge,
	LoadingContainer,
	PlaylistCard,
	PlaylistsContainer,
	Title,
} from "./UserPlaylistsModal.styles"

class UnconnectedUserPlaylistsModal extends React.PureComponent {
	static propTypes = {
		addTrackToPlaylist: PropTypes.func.isRequired,
		currentTrack: PropTypes.object,
		getUserPlaylists: PropTypes.func.isRequired,
		isAddingTrackToPlaylist: PropTypes.bool.isRequired,
		isLoadingPlaylists: PropTypes.bool.isRequired,
		isLoadingMorePlaylists: PropTypes.bool.isRequired,
		onClose: PropTypes.func.isRequired,
		playlistsDuckError: PropTypes.object,
		showNotification: PropTypes.func.isRequired,
		userPlaylists: PropTypes.object,
		visible: PropTypes.bool.isRequired,
	}

	static defaultProps = {
		currentTrack: null,
		playlistsDuckError: null,
		userPlaylists: [],
	}

	state = {
		currentTrack: this.props.currentTrack,
		playlistFilter: "",
		selectedPlaylist: null,
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.visible && this.props.visible) {
			this.props.getUserPlaylists()
			this.setState({ currentTrack: this.props.currentTrack })
		}
		if (
			prevProps.isAddingTrackToPlaylist &&
			!this.props.isAddingTrackToPlaylist &&
			!this.props.playlistsDuckError
		) {
			this.props.showNotification(
				FaCheckCircle,
				"Song added to playlist successfully.",
			)
		}
	}

	addTrackToPlaylist = () => {
		this.props.addTrackToPlaylist(
			this.state.selectedPlaylist.get("id"),
			this.state.currentTrack.get("id"),
		)
		this.props.onClose()
	}

	getNextPageOfPlaylists = () => {
		this.props.getUserPlaylists(
			{
				offset:
					this.props.userPlaylists.get("offset") +
					this.props.userPlaylists.get("limit"),
			},
			true,
		)
	}

	get FilteredPlaylists() {
		return this.props.userPlaylists
			.get("items")
			?.toArray()
			.filter(
				playlist => playlist.get("name").toLowerCase().includes(this.state.playlistFilter.toLowerCase())
			)
	}

	renderWaypoint() {
		if (
			this.props.userPlaylists?.get("total") <=
			this.props.userPlaylists?.get("items")?.size
		)
			return null
		if (this.props.isLoadingMorePlaylists)
			return (
				<LoadingContainer>
					<ReactLoading type="bubbles" />
				</LoadingContainer>
			)
		return (
			<Waypoint onEnter={this.getNextPageOfPlaylists}>
				<p>Load more..</p>
			</Waypoint>
		)
	}

	renderPlaylistOption = playlist => {
		return (
			<PlaylistCard
				key={playlist.get("id")}
				selected={
					playlist.get("id") ===
					this.state.selectedPlaylist?.get("id")
				}
				onClick={() => this.setState({ selectedPlaylist: playlist })}
			>
				<Title>{playlist.get("name")}</Title>
				<Badge>{playlist.get("track_count")} Songs</Badge>
			</PlaylistCard>
		)
	}

	renderContent() {
		if (this.props.isLoadingPlaylists) return <LoadingSplash />
		return (
			<>
				<SearchInput
					onChange={e => { this.setState({ playlistFilter: e.target.value }) }}
					placeholder="Filter"
					value={this.state.playlistFilter}
				/>
				<PlaylistsContainer>
					{this.FilteredPlaylists?.map(this.renderPlaylistOption)}
					{this.renderWaypoint()}
				</PlaylistsContainer>
			</>
		)
	}

	render() {
		return (
			<Modal
				footer={
					<>
						<Button onClick={this.addTrackToPlaylist}>Add</Button>
					</>
				}
				title="Add to Playlist"
				onClose={this.props.onClose}
				visible={this.props.visible}
			>
				{this.renderContent()}
			</Modal>
		)
	}
}

const mapStateToProps = state => ({
	isAddingTrackToPlaylist: playlistsDuck.selectors.isAddingTrackToPlaylistSelector(
		state,
	),
	isLoadingPlaylists: playlistsDuck.selectors.isLoadingPlaylistsSelector(
		state,
	),
	isLoadingMorePlaylists: playlistsDuck.selectors.isLoadingMorePlaylistsSelector(
		state,
	),
	playlistsDuckError: playlistsDuck.selectors.playlistsDuckErrorSelector(
		state,
	),
	userPlaylists: playlistsDuck.selectors.userPlaylistsSelector(state),
})

const mapDispatchToProps = {
	addTrackToPlaylist: playlistsDuck.actions.addTrackToPlaylist,
	getUserPlaylists: playlistsDuck.actions.getUserPlaylists,
	showNotification: toastNotificationsDuck.actions.showNotification,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedUserPlaylistsModal)
