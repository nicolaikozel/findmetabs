import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const ButtonRaised = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;

	border: none;
	border-radius: 3px;
	margin: 4px 2px;
	padding: 15px;

	background-color: ${Colors.PRIMARY};
	color: ${Colors.WHITE};

	font-size: 16px;
	font-weight: bold;
	text-align: center;
	text-decoration: none;

	cursor: pointer;
	z-index: 1;

	:hover {
		background-color: ${Colors.PRIMARY_HOVER};
	}
`

export const IconContainer = styled.div`
	margin-right: 12px;
`