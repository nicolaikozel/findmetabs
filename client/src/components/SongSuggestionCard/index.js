import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { MdPlayArrow, MdMusicNote } from "react-icons/md"

import tabHelpers from "../../helpers/tabHelpers"
import spotifyPlayerDuck from "../../redux/ducks/spotifyPlayer"
import Button from "../../components/Button"

import { 
	Artist,
	ButtonContainer,
	CardContainer,
	CardContentContainer,
	Title,
} from "./SongSuggestionCard.styles"

class UnconnectedSongSuggestionCard extends React.PureComponent {
    static propTypes = {
    	playSong: PropTypes.func.isRequired,
    	suggestion: PropTypes.object.isRequired,
    }

    render() {
    	return (
    		<CardContainer>
    			<img alt="album artwork" src={this.props.suggestion.get("artwork")} height="225px"/>
    			<CardContentContainer>
    				<Title>{this.props.suggestion.get("title")}</Title>
    			    <Artist>{this.props.suggestion.get("artist")}</Artist>
    				<ButtonContainer>
    					<Button icon={<MdPlayArrow />} onClick={() => this.props.playSong(this.props.suggestion)}>Play</Button>
    					<Button icon={<MdMusicNote />} onClick={() => tabHelpers.openTab(this.props.suggestion)}>View Tab</Button>
    				</ButtonContainer>
    			</CardContentContainer>
    	    </CardContainer>
    	)
    }
}

const mapDispatchToProps = {
	playSong: spotifyPlayerDuck.actions.playSong,
}

export default connect(null, mapDispatchToProps)(UnconnectedSongSuggestionCard)