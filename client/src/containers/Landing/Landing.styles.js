import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const CardContainer = styled.div`
	display: flex;
	justify-content: space-between;

	> div {
		width: 24%;
	}
`

export const Hero = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;

	height: 500px;
`

export const HeroImage = styled.img`
	position: relative;
	top: -50px;
`

export const Headline = styled.h1`
	margin-top: 0px;

	width: 75%;

	color: ${Colors.HEADLINE};
	text-align: center;
	font-size: 40px;
`

export const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 100px;
	height: 65px;
	margin: 4px 2px;
	padding: 18px;
	width: 275px;

	background-color: ${Colors.SPOTIFY_GREEN};
	color: ${Colors.WHITE};

	font-size: 16px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;

	cursor: pointer;
	z-index: 1;

	:hover {
		background-color: ${Colors.SPOTIFY_GREEN_HOVER};
	}
`

export const ButtonIconContainer = styled.div`
	margin-right: 10px;

	svg {
		height: 28px;
		width: 28px;
	}
`
