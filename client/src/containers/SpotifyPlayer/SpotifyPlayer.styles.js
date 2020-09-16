import styled from "styled-components"
import Slider from "@material-ui/core/Slider"

import { Colors } from "../../constants/branding"

export const SpotifyIconBackground = styled.div`
	position: absolute;
	background: white;
	height: 45px;
	width: 45px;
	z-index: -1;
	border-radius: 100%;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	flex-basis: 100%;

	margin: 0 0 0 10px;
`

export const PlaybackControls = styled.div`
	display: flex;
	align-items: center;

	margin-top: auto;

	svg {
		flex: 0 0 32px;

		cursor: pointer;
		opacity: 0.8;

		:hover {
			opacity: 1;
		}
	}

	input {
		width: 100%;
	}
`

export const VolumeSlider = styled(Slider)`
	margin-left: ${props => (props.muted ? "10px" : "3px")};

	color: ${Colors.HEADLINE}!important;
`

export const CollapseButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	right: -10px;
	top: -10px;

	height: 40px;
	width: 40px;

	border-radius: 100%;

	background-color: ${Colors.SPOTIFY_WHITE};
	color: ${Colors.SPOTIFY_BLACK};

	font-size: 30px;

	cursor: pointer;
`

export const CollapsedSpotifyPlayerContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	bottom: 20px;
	left: 20px;
	position: fixed;
	z-index: 10;

	border-radius: 100%;

	color: ${Colors.SPOTIFY_GREEN};

	font-size: 50px;

	cursor: pointer;
	transform: ${props =>
		props.visible ? "translateX(0)" : "translateX(-200px)"};
	transition: transform 0.5s ease-in-out;
`

export const ExpandedSpotifyPlayerContainer = styled.div`
	bottom: 20px;
	left: 20px;
	position: fixed;
	z-index: 10;

	display: flex;

	width: 300px;

	padding: 15px;

	background-color: ${Colors.PRIMARY};
	border-radius: 5px;
	color: ${Colors.HEADLINE};

	transform: ${props =>
		props.visible ? "translateY(0)" : "translateY(350px)"};
	transition: transform 0.5s ease-in-out;
`

export const SongInfoContainer = styled.div`
	padding-right: 20px;
`

export const Artist = styled.h2`
	margin: 0px;

	font-size: 12px;
`

export const SongTitle = styled.h1`
	margin: 0 0 3px 0;

	font-size: ${props => (props.smallText ? "14px" : "16px")};

	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`
