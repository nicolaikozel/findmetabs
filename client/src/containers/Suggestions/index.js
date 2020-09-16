import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { MdPlayArrow, MdMusicNote, MdRefresh } from "react-icons/md"

import tabHelpers from "../../helpers/tabHelpers"
import songSuggestionsDuck from "../../redux/ducks/songSuggestions"
import spotifyPlayerDuck from "../../redux/ducks/spotifyPlayer"
import requiresAuthorization from "../../HOC/requiresAuthorization"
import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import Button from "../../components/Button"
import LoadingSplash from "../../components/LoadingSplash"
import SongSuggestionCard from "../../components/SongSuggestionCard"
import {
	SectionAlt,
	SectionContainer,
	SectionSubTitle,
	SectionTitle,
	SectionTitleContainer,
} from "../../components/Layout"
import { Colors } from "../../constants/branding"

import {
	ContentContainer,
	LoadingContainer,
	SongSuggestionCardsContainer,
	SuggestionActions,
	SuggestionAlbumArt,
	SuggestionContainer,
	SuggestionSection,
	SuggestionTitle,
	SuggestionArtist,
	WaveContainer,
} from "./Suggestions.styles"

class UnconnectedSuggestions extends React.PureComponent {
	static propTypes = {
		getRandomSongSuggestions: PropTypes.func.isRequired,
		isLoadingSongSuggestions: PropTypes.bool.isRequired,
		otherSongSuggestions: PropTypes.object,
		playSong: PropTypes.func.isRequired,
		primarySongSuggestion: PropTypes.object,
		setPrimarySongSuggestion: PropTypes.func.isRequired,
	}

	static defaultProps = {
		otherSongSuggestions: null,
		primarySongSuggestion: null,
	}

	state = {
		loaded: false,
	}

	componentDidMount() {
		if (!this.props.primarySongSuggestion) {
			this.getSuggestions()
		}
	}

	isLoading = () => {
		return this.props.isLoadingSongSuggestions && !this.state.loaded
	}

	getSuggestions = () => {
		this.setState({ loaded: false })
		this.props.getRandomSongSuggestions()
	}

	render() {
		// ContentContainer is rendered but hidden
		// via "display: none" until images are loaded
		return (
			<>
				<LoadingContainer loaded={this.state.loaded}>
					<SectionContainer>
						<LoadingSplash />
					</SectionContainer>
				</LoadingContainer>
				<ContentContainer loaded={this.state.loaded}>
					{this.renderPrimarySuggestion()}
					{this.renderOtherSuggestions()}
				</ContentContainer>
			</>
		)
	}

	renderPrimarySuggestion() {
		return (
			<SuggestionSection>
				<SectionContainer>
					<SuggestionContainer>
						<SuggestionTitle>
							{this.props.primarySongSuggestion?.get("title")}
						</SuggestionTitle>
						<SuggestionArtist>
							{this.props.primarySongSuggestion?.get("artist")}
						</SuggestionArtist>
						<SuggestionAlbumArt
							onLoad={() => this.setState({ loaded: true })}
							src={this.props.primarySongSuggestion?.get(
								"artwork",
							)}
							width="350px"
						/>
						<SuggestionActions>
							<Button
								icon={<MdPlayArrow />}
								onClick={() =>
									this.props.playSong(
										this.props.primarySongSuggestion,
									)
								}
							>
								Play
							</Button>
							<Button
								icon={<MdMusicNote />}
								onClick={() =>
									tabHelpers.openTab(
										this.props.primarySongSuggestion,
									)
								}
							>
								View Tab
							</Button>
							<Button
								icon={<MdRefresh />}
								onClick={this.getSuggestions}
							>
								New Suggestion
							</Button>
						</SuggestionActions>
					</SuggestionContainer>
				</SectionContainer>
				<WaveContainer>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1440 320"
					>
						<path
							fill={Colors.BACKGROUND_ALT}
							fillOpacity="1"
							d="M0,192L80,213.3C160,235,320,277,480,245.3C640,213,800,107,960,80C1120,53,1280,107,1360,133.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
						></path>
					</svg>
				</WaveContainer>
			</SuggestionSection>
		)
	}

	renderOtherSuggestions() {
		return (
			<SectionAlt>
				<SectionContainer>
					<SectionTitleContainer>
						<SectionTitle>Other Suggestions</SectionTitle>
						<SectionSubTitle>
							Not feeling the song above? Maybe one of these will
							rock!
						</SectionSubTitle>
					</SectionTitleContainer>
					<SongSuggestionCardsContainer>
						{this.props.otherSongSuggestions?.map(suggestion => {
							return (
								<SongSuggestionCard
									key={suggestion.get("title")}
									suggestion={suggestion}
									onClick={() => {
										this.props.setPrimarySongSuggestion(
											suggestion,
										)
										window.scrollTo(0, 0)
									}}
								/>
							)
						})}
					</SongSuggestionCardsContainer>
				</SectionContainer>
			</SectionAlt>
		)
	}
}

const mapStateToProps = state => ({
	isLoadingSongSuggestions: songSuggestionsDuck.selectors.isLoadingSongSuggestionsSelector(
		state,
	),
	otherSongSuggestions: songSuggestionsDuck.selectors.otherSongSuggestionsSelector(
		state,
	),
	primarySongSuggestion: songSuggestionsDuck.selectors.primarySongSuggestionSelector(
		state,
	),
})

const mapDispatchToProps = {
	getRandomSongSuggestions:
		songSuggestionsDuck.actions.getRandomSongSuggestions,
	playSong: spotifyPlayerDuck.actions.playSong,
	setPrimarySongSuggestion:
		songSuggestionsDuck.actions.setPrimarySongSuggestion,
}

export default connect(mapStateToProps, mapDispatchToProps)(requiresAuthorization(withHeaderAndFooter(UnconnectedSuggestions)))
