import styled from "styled-components"
import { Colors } from "../../constants/branding"

export const CardContainer = styled.div`
	display: flex;

	padding: 20px;

	background-color: ${Colors.CARD_BACKGROUND_ALT};
`

export const CardContentContainer = styled.div`
	display: flex;
	flex-direction: column;

	margin-left: 12px;

	width: 100%;
`

export const Title = styled.h2`
	margin: 0;

    color: ${Colors.HEADLINE};
    font-size: 18px;
    line-height: 1.3;

    overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`

export const Badge = styled.span`
    align-self: flex-start;
    margin-top: 5px;
    border-radius: 100px;
    padding: 5px 15px;

    background-color: ${Colors.HIGHLIGHT};
    color: ${Colors.HEADLINE};
    font-size: 14px;
    font-weight: normal;
`

export const ButtonContainer = styled.div`
    margin-top: auto;

    button {
        padding: 8px;
        width: 100%;
    }

    button:not(:last-child) {
        margin-bottom: 10px;
    }
`