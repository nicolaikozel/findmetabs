import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import toastNotificationsDuck from "../../redux/ducks/toastNotifications"

import { IconContainer, ToastNotificationContainer } from "./ToastNotification.styles"

class UnconnectedToastNotification extends React.PureComponent {
    static propTypes = {
    	currentNotification: PropTypes.object,
    	isShowingNotification: PropTypes.bool.isRequired,
    }
	
	static defaultProps = {
		currentNotification: null,	
	}

	render() {
		const { currentNotification } = this.props
		const Icon = currentNotification?.get("icon")
    	return (
    		<ToastNotificationContainer visible={this.props.isShowingNotification}>
        		<IconContainer>
    			    {Icon && <Icon />}
    		    </IconContainer>
    		    {currentNotification?.get("message")}
    	    </ToastNotificationContainer>
    	)
	}
}

const mapStateToProps = state => ({
	currentNotification: toastNotificationsDuck.selectors.currentNotificationSelector(state),
	isShowingNotification: toastNotificationsDuck.selectors.isShowingNotificationSelector(state),
})

export default connect(mapStateToProps)(UnconnectedToastNotification)