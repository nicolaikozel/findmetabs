import React from "react"

import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import ErrorNotification from "../../components/ErrorNotification"
import { SectionFullHeight, SectionContainer } from "../../components/Layout"

class Error extends React.PureComponent {
	render() {
		return (
			<>
				<SectionFullHeight>
					<SectionContainer>
						<ErrorNotification />
					</SectionContainer>
				</SectionFullHeight>
			</>
		)
	}
}

export default withHeaderAndFooter(Error)
