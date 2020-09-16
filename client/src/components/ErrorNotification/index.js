import React from "react"

import Button from "../Button"
import { SectionTitle } from "../Layout"

import { ErrorNotificationContent, ErrorMessageContainer } from "./ErrorNotification.styles"

class ErrorNotification extends React.PureComponent {
	render() {
		return (
			<ErrorNotificationContent>
				<SectionTitle>Oops!</SectionTitle>
				<ErrorMessageContainer>
					<p>It looks like something didn't quite work as expected.</p>
					<p>We have been notified of the problem and will try to fix it as soon as we can.</p>
				</ErrorMessageContainer>
				<Button onClick={() => window.location.reload()}>Reload Page</Button>
			</ErrorNotificationContent>
		)
	}
}

export default ErrorNotification