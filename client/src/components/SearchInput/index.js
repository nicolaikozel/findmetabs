import React from "react"
import PropTypes from "prop-types"

import { ClearIcon, Input, InputContainer, SearchIcon } from "./SearchInput.styles"

class SearchInput extends React.PureComponent {
    static propTypes = {
    	onChange: PropTypes.func.isRequired,
    	placeholder: PropTypes.string,
    	value: PropTypes.string,
    }

    static defaultProps = {
    	placeholder: "",
    	value: "",
    }

    render() {
    	return (
    		<InputContainer>
    			<SearchIcon />
    		    <Input
    			    placeholder={this.props.placeholder}
    			    type="text"
    			    onChange={this.props.onChange}
    			    value={this.props.value}
    		    />
    			<ClearIcon onClick={() => this.props.onChange({ target: { value: "" }})}/>
    		</InputContainer>
    	)
    }
}

export default SearchInput