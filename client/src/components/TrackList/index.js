import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"
import { MdPlayCircleFilled } from "react-icons/md"
import ReactLoading from "react-loading"

import tabHelpers from "../../helpers/tabHelpers"
import spotifyPlayerDuck from "../../redux/ducks/spotifyPlayer"
import SearchInput from "../../components/SearchInput"

import {
	Container,
	LoadingContainer,
	PlayButtonContainer,
	TrackListTable,
	ViewTabButtonContainer,
} from "./TrackList.styles"

class UnconnectedTrackList extends React.PureComponent {
	static propTypes = {
		allTracksFetched: PropTypes.bool.isRequired,
		isFetching: PropTypes.bool.isRequired,
		onFetch: PropTypes.func.isRequired,
		playSong: PropTypes.func.isRequired,
		tracks: PropTypes.arrayOf(PropTypes.object),
	}

	static defaultProps = {
		tracks: null,
	}

	state = {
		trackFilter: "",
	}

	get FilteredTracks() {
		return this.props.tracks
			?.filter(
				track => track.get("title").toLowerCase().includes(this.state.trackFilter.toLowerCase())
			)
	}

	renderWaypoint() {
		if (this.props.allTracksFetched) return null
		if (this.props.isFetching)
			return (
				<LoadingContainer>
					<ReactLoading type="bubbles" />
				</LoadingContainer>
			)
		return (
			<Waypoint onEnter={this.props.onFetch}>
				<p>Load more..</p>
			</Waypoint>
		)
	}

	renderTrackRow = track => {
		return (
			<tr key={track.get("id")}>
				<td>{track.get("title")}</td>
				<td>{track.get("artist")}</td>
				<td>{track.get("album")}</td>
				<td>
					<PlayButtonContainer
						onClick={() => {
							this.props.playSong(track)
						}}
					>
						<MdPlayCircleFilled />
					</PlayButtonContainer>
				</td>
				<td>
					<ViewTabButtonContainer
						onClick={() => {
							tabHelpers.openTab(track)
						}}
					>
						View Tab
					</ViewTabButtonContainer>
				</td>
			</tr>
		)
	}

	render() {
		return (
			<>
				<Container>
					<SearchInput
						onChange={e => { this.setState({ trackFilter: e.target.value }) }}
						placeholder="Filter"
						value={this.state.trackFilter}
					/>
					<TrackListTable>
						<thead>
							<tr>
								<th>TITLE</th>
								<th>ARTIST</th>
								<th>ALBUM</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>{this.FilteredTracks?.map(this.renderTrackRow)}</tbody>
					</TrackListTable>
					{this.renderWaypoint()}
				</Container>
			</>
		)
	}
}

const mapDispatchToProps = {
	playSong: spotifyPlayerDuck.actions.playSong,
}

export default connect(null, mapDispatchToProps)(UnconnectedTrackList)
