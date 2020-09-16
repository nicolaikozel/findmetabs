import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { IconContext } from "react-icons"
import { FaSpotify } from "react-icons/fa"
import {
	MdKeyboardArrowDown,
	MdPauseCircleOutline,
	MdPlaylistAdd,
	MdPlayCircleFilled,
	MdVolumeDown,
	MdVolumeOff,
	MdVolumeUp,
} from "react-icons/md"

import ScriptCache from "../../utils/ScriptCache"
import { SpotifyAccessStatus } from "../../constants/spotify"
import spotifyAuthorizationDuck from "../../redux/ducks/spotifyAuthorization"
import spotifyPlayerDuck from "../../redux/ducks/spotifyPlayer"
import { getRefreshToken } from "../../redux/api"
import UserPlaylistsModal from "../UserPlaylistsModal"

import {
	Artist,
	CollapseButton,
	CollapsedSpotifyPlayerContainer,
	ContentContainer,
	ExpandedSpotifyPlayerContainer,
	PlaybackControls,
	SongTitle,
	SongInfoContainer,
	SpotifyIconBackground,
	VolumeSlider,
} from "./SpotifyPlayer.styles"

const PLAYER_STATE = {
	AUTH_REJECTED: "AUTH_REJECTED",
	LOADING_SCRIPTS: "LOADING_SCRIPTS",
	READY: "READY",
}

const DEFAULT_VOLUME = 0.7

class UnconnectedSpotifyPlayer extends React.PureComponent {
	constructor(props) {
		super(props)
		new ScriptCache([
			{
				name: "https://sdk.scdn.co/spotify-player.js",
				callback: this.spotifySDKCallback,
			},
		])

		window.addEventListener("storage", this.authorizeSpotifyFromStorage)
	}

	static propTypes = {
		collapsePlayer: PropTypes.func.isRequired,
		currentTrack: PropTypes.object,
		expandPlayer: PropTypes.func.isRequired,
		isExpanded: PropTypes.bool.isRequired,
		isPlaying: PropTypes.bool.isRequired,
		pauseSong: PropTypes.func.isRequired,
		resumeSong: PropTypes.func.isRequired,
		setSpotifyPlayerDeviceId: PropTypes.func.isRequired,
		spotifyAccessStatus: PropTypes.string,
	}

	static defaultProps = {
		currentTrack: null,
		spotifyAccessStatus: null,
	}

	state = {
		player: null,
		playerState: PLAYER_STATE.LOADING_SCRIPTS,
		selectedPlaylist: null,
		showingAddToPlaylistModal: false,
		mutedVolume: null,
		volume: DEFAULT_VOLUME,
	}

	spotifySDKCallback = () => {
		window.onSpotifyWebPlaybackSDKReady = () => {
			if (
				this.props.spotifyAccessStatus === SpotifyAccessStatus.ALLOWED
			) {
				const player = new window.Spotify.Player({
					name: "FindMeTabs",
					getOAuthToken: cb => {
						getRefreshToken().then(accessToken => cb(accessToken))
					},
				})
				player.addListener("ready", ({ device_id }) => {
					console.log(`Player ${device_id} is ready.`)
					this.setState({ playerState: PLAYER_STATE.READY })
					this.props.setSpotifyPlayerDeviceId(device_id)
				})
				player.addListener("initialization_error", ({ message }) => { console.error(message) })
				player.addListener("authentication_error", ({ message }) => { console.error(message) })
				player.addListener("account_error", ({ message }) => { console.error(message) })
				player.addListener("playback_error", ({ message }) => { console.error(message) })
				player.setVolume(DEFAULT_VOLUME)
				player.connect().then(success => {
					console.log("Player connected: ", success)
				})
				this.setState({ player })
			} else {
				this.setState({ playerState: PLAYER_STATE.AUTH_REJECTED })
			}
		}
	}

	setVolume = volume => {
		this.setState({
			mutedVolume: volume === 0 ? this.state.volume : null,
			volume,
		})
		this.state.player.setVolume(volume)
	}

	renderVolumeControl() {
		const { volume } = this.state
		const isMuted = volume === 0
		let VolumeIcon = MdVolumeUp
		if (isMuted) {
			VolumeIcon = MdVolumeOff
		} else if (volume <= 0.5) {
			VolumeIcon = MdVolumeDown
		}
		return (
			<>
				<VolumeIcon
					onClick={() => {
						if (!this.state.player) return
						if (isMuted) {
							this.setVolume(this.state.mutedVolume || DEFAULT_VOLUME)
						} else {
							this.setVolume(0)
						}
					}}
				/>
				<VolumeSlider
					muted={isMuted}
					min={0}
					max={100}
					onChange={(_, newValue) =>
						this.setVolume(parseInt(newValue)/100)
					}
					value={volume*100}
				/>
			</>
		)
	}

	renderControls() {
		return (
			<PlaybackControls>
				<IconContext.Provider
					value={{
						size: "32px",
					}}
				>
					<MdPlaylistAdd onClick={this.showAddToPlaylistModal} />
					{this.props.isPlaying ? (
						<MdPauseCircleOutline onClick={this.props.pauseSong} />
					) : (
						<MdPlayCircleFilled onClick={this.props.resumeSong} />
					)}
					{this.renderVolumeControl()}
				</IconContext.Provider>
			</PlaybackControls>
		)
	}

	renderExpanded() {
		const { currentTrack, isExpanded } = this.props
		return (
			<ExpandedSpotifyPlayerContainer visible={isExpanded}>
				<img
					alt="album artwork"
					src={currentTrack?.get("artwork")}
					height="125"
					width="125"
				/>
				<ContentContainer>
					<SongInfoContainer>
						<SongTitle
							smallText={currentTrack?.get("title").length >= 40}
						>
							{currentTrack?.get("title")}
						</SongTitle>
						<Artist>
							{this.props.currentTrack?.get("artist")}
						</Artist>
					</SongInfoContainer>
					{this.renderControls()}
				</ContentContainer>
				<CollapseButton onClick={this.props.collapsePlayer}>
					<MdKeyboardArrowDown />
				</CollapseButton>
			</ExpandedSpotifyPlayerContainer>
		)
	}

	renderCollapsed() {
		return (
			<CollapsedSpotifyPlayerContainer
				onClick={() =>
					this.props.currentTrack && this.props.expandPlayer()
				}
				visible={!this.props.isExpanded && this.props.currentTrack}
			>
				<FaSpotify />
				<SpotifyIconBackground />
			</CollapsedSpotifyPlayerContainer>
		)
	}

	hideAddToPlaylistModal = () => {
		this.setState({ showingAddToPlaylistModal: false })
	}

	showAddToPlaylistModal = () => {
		this.setState({ showingAddToPlaylistModal: true })
	}

	renderUserPlaylistsModal() {
		return (
			<UserPlaylistsModal
				currentTrack={this.props.currentTrack}
				onClose={this.hideAddToPlaylistModal}
				visible={this.state.showingAddToPlaylistModal}
			/>
		)
	}

	render() {
		return (
			<>
				{this.renderCollapsed()}
				{this.renderExpanded()}
				{this.renderUserPlaylistsModal()}
			</>
		)
	}
}

const mapStateToProps = state => ({
	currentTrack: spotifyPlayerDuck.selectors.currentTrackSelector(state),
	isExpanded: spotifyPlayerDuck.selectors.isExpandedSelector(state),
	isPlaying: spotifyPlayerDuck.selectors.isPlayingSelector(state),
	spotifyAccessStatus: spotifyAuthorizationDuck.selectors.spotifyAccessStatusSelector(
		state,
	),
})

const mapDispatchToProps = {
	collapsePlayer: spotifyPlayerDuck.actions.collapsePlayer,
	expandPlayer: spotifyPlayerDuck.actions.expandPlayer,
	pauseSong: spotifyPlayerDuck.actions.pauseSong,
	resumeSong: spotifyPlayerDuck.actions.resumeSong,
	setSpotifyPlayerDeviceId:
		spotifyPlayerDuck.actions.setSpotifyPlayerDeviceId,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(UnconnectedSpotifyPlayer)
