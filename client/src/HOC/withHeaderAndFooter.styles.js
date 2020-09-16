import styled from "styled-components"
import { Link } from "react-router-dom"

import { Colors } from "../constants/branding"
import { Section as UnstyledSection } from "../components/Layout"

export const HeaderContainer = styled.div`
    display: flex;

    color: ${Colors.HEADLINE};

    p {
        margin: 0px;
    }
`

export const Logo = styled(Link)`
    color: inherit;

    font-size: 20px;
    font-weight: bold;
    text-decoration: none;

    cursor: pointer;
`

export const NavLinksContainer = styled.div`
    margin-left: auto;

    > div {
        display: inline;

        :not(:last-child) {
            margin-right: 20px;
        }
    }
`

export const NavLink = styled.div`
    a {
        padding-bottom: 5px;
        border-bottom: ${props => props.active ? `1px solid ${Colors.HEADLINE}` : "none"};

        color: inherit;
        font-weight: ${props => props.active ? "bolder" : "600"};
        text-decoration: none;

        opacity: ${props => props.active ? "1" : "0.8"};

        :hover {
            opacity: 1;
        }
    }
`

export const LinkSeparator = styled.p`
    padding-left: 10px;
    padding-right: 10px;
`

export const FooterLink = styled(Link)`
    color: inherit;
    text-decoration: none;
    line-height: 1.5;
`

export const SectionSmall = styled(UnstyledSection)`
    padding: 30px 0 20px 0;
`

export const FooterContainer = styled.div`
	display: flex;
	align-items: center;

	p {
		margin: 0px;
	}
`

export const SocialLinksContainer = styled.div`
	margin-left: auto;

	a:not(:last-child) {
		margin-right: 10px;
	}

	a:hover {
		color: ${Colors.HEADLINE};

		cursor: pointer;
	}
`

export const SocialLink = styled.a`
	color: inherit;
`
