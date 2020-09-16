import React from "react"
import PropTypes from "prop-types"
import { MdQueueMusic } from "react-icons/md"
import { withRouter } from "react-router-dom"

import Button from "../../components/Button"

import {
	Badge,
	ButtonContainer,
	CardContainer,
	CardContentContainer,
	Title,
} from "./PlaylistCard.styles"

const DEFAULT_IMAGE_URL = "https://recordsale.de/assets/record_placeholder-f3f829566497dc26b0abfae50ddeb5c7bc48fe1c58dc1c7fe62a26d64988b9c9.svg"

class PlaylistCard extends React.PureComponent {
    static propTypes = {
    	history: PropTypes.object.isRequired,
    	playlist: PropTypes.object.isRequired,
    }

    render() {
    	return (
    		<CardContainer>
    			<img alt="playlist artwork" src={this.props.playlist.get("artwork") || DEFAULT_IMAGE_URL} height="175px" width="175px"/>
    			<CardContentContainer>
    				<Title>{this.props.playlist.get("name")}</Title>
    				<Badge>{this.props.playlist.get("track_count")} Songs</Badge>
    				<ButtonContainer>
    					<Button
    						icon={<MdQueueMusic />}
    						onClick={
    							() => this.props.history.push(`/playlists/${this.props.playlist.get("id")}`)
    						}
    					>
							View Songs
    					</Button>
    				</ButtonContainer>
    			</CardContentContainer>
    	    </CardContainer>
    	)
    }
}

export default withRouter(PlaylistCard)