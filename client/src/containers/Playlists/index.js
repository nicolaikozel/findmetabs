import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Waypoint } from "react-waypoint"
import ReactLoading from "react-loading"

import playlistsDuck from "../../redux/ducks/playlists"
import requiresAuthorization from "../../HOC/requiresAuthorization"
import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import PlaylistCard from "../../components/PlaylistCard"
import LoadingSplash from "../../components/LoadingSplash"
import {
	SectionFullHeight,
	SectionContainer,
	SectionTitle,
	SectionTitleContainer,
} from "../../components/Layout"
import SearchInput from "../../components/SearchInput"

import { LoadingContainer, PlaylistCardContainer } from "./Playlists.styles"

class Playlists extends React.PureComponent {
	static propTypes = {
		getUserPlaylists: PropTypes.func.isRequired,
		isLoadingPlaylists: PropTypes.bool.isRequired,
		isLoadingMorePlaylists: PropTypes.bool.isRequired,
		playlistsDuckError: PropTypes.object,
		userPlaylists: PropTypes.object,
	}

	static defaultProps = {
		playlistsDuckError: null,
		userPlaylists: [],
	}

	state = { 
		playlistFilter: "",
	}

	componentDidMount() {
		this.props.getUserPlaylists()
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

	renderContent() {
		if (this.props.isLoadingPlaylists) return <LoadingSplash />
		return (
			<>
				<SectionTitleContainer>
					<SectionTitle>My Playlists</SectionTitle>
				</SectionTitleContainer>
				<SectionContainer maxWidth="1300px">
					<PlaylistCardContainer>
						<SearchInput
							onChange={e => { this.setState({ playlistFilter: e.target.value }) }}
							placeholder="Filter"
							value={this.state.playlistFilter}
						/>
						{this.FilteredPlaylists
							?.map(playlist => {
								return (
									<PlaylistCard
										key={playlist.get("id")}
										playlist={playlist}
									/>
								)
							})}
					</PlaylistCardContainer>
					{this.renderWaypoint()}
				</SectionContainer>
			</>
		)
	}

	render() {
		return <SectionFullHeight>{this.renderContent()}</SectionFullHeight>
	}
}

const mapStateToProps = state => ({
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
	getUserPlaylists: playlistsDuck.actions.getUserPlaylists,
}

export default requiresAuthorization(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(withHeaderAndFooter(Playlists)),
)
