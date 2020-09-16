import PropTypes from "prop-types"
import React from "react"
import { IconContext } from "react-icons"

import { Colors } from "../../constants/branding"

import { Container, Content, Header, IconContainer, Title } from "./Card.styles"

class Card extends React.PureComponent {
	static propTypes = {
		content: PropTypes.string.isRequired,
		icon: PropTypes.node.isRequired,
		title: PropTypes.string.isRequired,
	}

	render() {
		return (
			<Container>
				<Header>
					<Title>{this.props.title}</Title>
					<IconContext.Provider
						value={{
							color: Colors.HEADLINE,
							size: "32px",
						}}
					>
						<IconContainer>{this.props.icon}</IconContainer>
					</IconContext.Provider>
				</Header>
				<Content>
					<p>{this.props.content}</p>
				</Content>
			</Container>
		)
	}
}

export default Card
