import styled from "styled-components"
import { Colors } from "../../constants/branding"

export const CardContainer = styled.div`
	display: flex;

	padding: 20px;

	background-color: ${Colors.CARD_BACKGROUND};
`

export const CardContentContainer = styled.div`
	display: flex;
	flex-direction: column;

	margin-left: 20px;

	width: 100%;
`

export const Title = styled.h2`
	margin: 0;

	color: ${Colors.HEADLINE};
    font-size: 18px;
    
    overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`

export const Artist = styled.h3`
	margin: 5px 0 0 0;

    font-size: 16px;
    overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
`

export const ButtonContainer = styled.div`
	margin-top: auto;

	button {
		padding: 10px;
		width: 100%;
	}

	button:not(:last-child) {
		margin-bottom: 10px;
	}
`
