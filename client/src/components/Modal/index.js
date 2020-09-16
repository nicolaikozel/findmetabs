import React from "react"
import PropTypes from "prop-types"

import { 
	ModalCloseIcon,
	ModalContainer,
	ModalContent,
	ModalHeader,
	ModalMain,
	ModalFooter,
} from "./Modal.styles"

class Modal extends React.PureComponent {
    static propTypes = {
    	children: PropTypes.node,
    	footer: PropTypes.node,
    	title: PropTypes.string.isRequired,
    	onClose: PropTypes.func.isRequired,
    	visible: PropTypes.bool.isRequired,
    }

    static defaultProps = {
    	children: null,
    	footer: null,
    }
	
    componentDidMount() {
    	if (this.props.visible) {
    		this.addNoScroll()
    	}
    	this.addHandleClickOutsideListener()
    }
	
    componentDidUpdate(prevProps) {
    	if (!prevProps.visible && this.props.visible) {
    		this.addNoScroll()	
    	}
    	if (prevProps.visible && !this.props.visible) {
    		this.removeNoScroll()	
    	}
    }

    componentWillUnmount() {
    	this.removeNoScroll()
    	this.removeHandleClickOutsideListener()
    }
	
    addNoScroll() {
    	document.body.classList.add("noscroll")
    }
	
    addHandleClickOutsideListener() {
    	document.addEventListener("mousedown", this.handleClickOutside)
    }

    removeHandleClickOutsideListener() {
    	document.removeEventListener("mousedown", this.handleClickOutside)
    }
	
    removeNoScroll() {
    	document.body.classList.remove("noscroll")
    }
	
    setModalRef = node => {
    	this.modalRef = node
    }
	
    handleClickOutside = event => {
    	if (this.modalRef && !this.modalRef.contains(event.target)) {
    		this.props.onClose()
    	}
    }

    render() {
    	if (!this.props.visible) return null
    	return (
    		<ModalContainer>
    			<ModalContent ref={this.setModalRef}>
    				<ModalHeader>
    				    <h1>{this.props.title}</h1>
    					<ModalCloseIcon onClick={this.props.onClose}/>
    				</ModalHeader>
    				<ModalMain>
    					{this.props.children}
    				</ModalMain>
    				<ModalFooter>
    					{this.props.footer}
    				</ModalFooter>
    			</ModalContent>
    		</ModalContainer>
    	)
    }
}

export default Modal