import PropTypes from "prop-types"
import React from "react"
import { IconContext } from "react-icons"

import { ButtonRaised, IconContainer } from "./Button.styles"

class Button extends React.PureComponent {
	static propTypes = {
		children: PropTypes.node.isRequired,
		icon: PropTypes.node,
		onClick: PropTypes.func.isRequired,
	}

	static defaultProps = {
		icon: null,
	}

	renderIcon() {
		return (
			this.props.icon && 
			<IconContainer>
				<IconContext.Provider
					value={{
						size: "25px",
					}}
				>
					{this.props.icon}
				</IconContext.Provider>
			</IconContainer>
		)
	}

	render() {
		const { children, onClick } = this.props
		return (
			<ButtonRaised onClick={onClick}>
				{this.renderIcon()}
				{children}
			</ButtonRaised>
		)
	}
}

export default Button