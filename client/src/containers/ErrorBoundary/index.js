import React from "react"
import PropTypes from "prop-types"

import ErrorNotification from "../../components/ErrorNotification"

import { Container } from "./ErrorBoundary.styles"

class ErrorBoundary extends React.Component {    
    static propTypes = {
    	children: PropTypes.node.isRequired,
    }

    state = {
    	hasError: false,
    }
  
    static getDerivedStateFromError(error) {
    	return { hasError: true }
    }
  
    render() {
    	if (this.state.hasError) {
    		return (
    			<Container>
    				<ErrorNotification />
    			</Container>
    		)
    	}
    	return this.props.children 
    }
}

export default ErrorBoundary