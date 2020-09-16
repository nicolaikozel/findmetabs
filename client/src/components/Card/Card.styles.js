import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const Container = styled.div`
	padding: 40px;

	background-color: ${Colors.CARD_BACKGROUND};
	border-radius: 3px;
`

export const Header = styled.div`
	display: flex;

	height: 75px;
	margin-bottom: 10px;
`

export const Title = styled.h2`
	margin: 0 20px 0 0;
`

export const IconContainer = styled.div`
	svg {
		padding: 10px;

		background: ${Colors.PRIMARY};
		border-radius: 50px;
	}
`

export const Content = styled.div`
	p {
		margin: 0px;

		font-size: 16px;
		line-height: 1.8;
	}
`
