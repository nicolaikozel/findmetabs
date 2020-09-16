import React from "react"
import ReactLoading from "react-loading"

import guitar1 from "../../assets/images/guitar_1.png"
import guitar2 from "../../assets/images/guitar_2.png"

import { Caption, LoadingSplashContent } from "./LoadingSplash.styles"

class LoadingSplash extends React.PureComponent {
	images = [guitar1, guitar2]
	captions = ["Tuning the strings...", "Headbanging in the car..."]

	render() {
    	return (
    		<LoadingSplashContent>
    			<img alt="drawing of a guitar" src={this.images[Math.floor(Math.random() * this.images.length)]} width="250px"/>
				<Caption>{this.captions[Math.floor(Math.random() * this.captions.length)]}</Caption>
    			<ReactLoading type="bubbles" />
    		</LoadingSplashContent>
    	)
	}
}

export default LoadingSplash