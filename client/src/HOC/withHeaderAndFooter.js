import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { FaGithub, FaLinkedin, FaMediumM } from "react-icons/fa"
import { IconContext } from "react-icons"

import logo from "../assets/images/logo.png"

import spotifyAuthorizationDuck from "../redux/ducks/spotifyAuthorization"
import { SectionContainer } from "../components/Layout"

import {
	FooterLink,
	HeaderContainer,
	LinkSeparator,
	Logo,
	NavLink,
	NavLinksContainer,
	FooterContainer,
	SectionSmall,
	SocialLink,
	SocialLinksContainer,
} from "./withHeaderAndFooter.styles"

const LOGGED_IN_ROUTES = [
	{
		path: "/suggestions",
		name: "Suggestions",
		relative: false,
	},
	{
		path: "/playlists",
		name: "My Playlists",
		relative: true,
	},
]
const LOGGED_OUT_ROUTES = [
	{
		path: "/",
		name: "Home",
		relative: false,
	},
	{
		path: "/about",
		name: "About",
		relative: false,
	},
]

export default function (WrappedComponent) {  
	class WithHeaderAndFooter extends React.Component {		
		static propTypes = {
			location: PropTypes.object.isRequired,
			isSpotifyAccessAuthorized: PropTypes.bool,
		}
        
        static defaultProps = {
        	isSpotifyAccessAuthorized: null,
        }
		
        isRouteActive(route) {
        	if (route.relative) {
        		return this.props.location.pathname.includes(route.path)
        	}
        	return this.props.location.pathname === route.path
        }

        renderNavLink = (route) => {
        	return (
        		<NavLink
        			key={route.path}
        			active={this.isRouteActive(route)}
        		>
        			<Link
        				
        				to={route.path}
        			>
        				{route.name}
        			</Link>
        		</NavLink>
        	)
        }

        renderHeader() {
        	const routes = this.props.isSpotifyAccessAuthorized ? LOGGED_IN_ROUTES : LOGGED_OUT_ROUTES
        	return (
        		<SectionSmall>
        			<SectionContainer>
        				<HeaderContainer>
        					<Logo to="/">
        						<img src={logo} width={"125px"}/>
        					</Logo>
        					<NavLinksContainer>
        						{routes.map(this.renderNavLink)}
        					</NavLinksContainer>
        				</HeaderContainer>
        			</SectionContainer>
        		</SectionSmall>
        	)
        }

        renderFooter() {
        	return (
        		<SectionSmall>
        			<SectionContainer>
        				<FooterContainer>
        					<p>Created by Nicolai Kozel</p>
        					<LinkSeparator>•</LinkSeparator>
        					<FooterLink to="/about">About</FooterLink>
        					<SocialLinksContainer>
        						<IconContext.Provider
        							value={{
        								size: "30px",
        							}}
        						>
        							<SocialLink href="https://github.com/nicolaikozel"><FaGithub /></SocialLink>
        							<SocialLink href="https://medium.com/@nicolaikozel"><FaMediumM /></SocialLink>
        							<SocialLink href="https://www.linkedin.com/in/nicolaikozel/"><FaLinkedin/></SocialLink>
        						</IconContext.Provider>
        					</SocialLinksContainer>
        				</FooterContainer>
        			</SectionContainer>
        		</SectionSmall>
        	)
        }

        render() {
        	return (
        		<>
        			{this.renderHeader()}
        			<WrappedComponent {...this.props} />
        			{this.renderFooter()}
        		</>
        	)
        }
	}
    
	const mapStateToProps = (state) => {
		return {
			isSpotifyAccessAuthorized: spotifyAuthorizationDuck.selectors.isSpotifyAccessAuthorizedSelector(state),
		}
	}
    
	return connect(mapStateToProps)(withRouter(WithHeaderAndFooter))
}