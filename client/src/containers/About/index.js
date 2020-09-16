import React from "react"
import { FaGithub, FaLinkedin, FaMediumM } from "react-icons/fa"

import me from "../../assets/images/me.png"

import windowHelpers from "../../helpers/windowHelpers"
import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import Button from "../../components/Button"
import {
	SectionFullHeight,
	SectionContainer,
	SectionTitle,
	SectionTitleContainer,
} from "../../components/Layout"

import { ButtonsContainer, ContentContainer, Me } from "./About.styles"

class About extends React.PureComponent {
	render() {
		return (
			<>
				<SectionFullHeight>
					<SectionContainer>
						<SectionTitleContainer>
							<SectionTitle>About</SectionTitle>
						</SectionTitleContainer>
						<ContentContainer>
							<div>
								<p>
                                    Hi there <span role="img" aria-label="Hand Waving Emoji">👋</span> My name is Nicolai Kozel, I'm the creator of Find Me Tabs.
                                    I currently work as a Full Stack Developer at Top Hat, an education tech company based in Toronto.
								</p>
								<p>
									This project pairs two of my biggest passions, music and coding. I've played Guitar for over 10 years
									and spent a lot of that time in a band writing, recording, and playing gigs.
									(You can check out one of our music videos <a href="https://www.youtube.com/watch?v=ktBSixcL1CE" target="_blank" rel="noopener noreferrer">here</a>!)
								</p>
								<p>
									One of the problems I've experienced over all these years is finding songs to learn that are both fun 
									and that I can get excited about. Whenever I looked for suggestions, all I could find were the same boring "Top 10" lists. Hence, Find Me Tabs was born! 
								</p>
								<p>
									I hope this site will help inspire you to play guitar and become a true rock god <span role="img" aria-label="Guitar Emoji">🎸</span>. 
								</p>
							</div>
							<Me src={me} height="375px"/>
						</ContentContainer>
						<h2>Let's Be Friends</h2>
						<ButtonsContainer>
							<Button
								icon={<FaGithub />}
								onClick={
									() => windowHelpers.openNewTab("https://github.com/nicolaikozel")
								}
							>
								Github
							</Button>
							<Button
								icon={<FaMediumM />}
								onClick={
									() => windowHelpers.openNewTab("https://medium.com/@nicolaikozel")
								}
							>
								Medium
							</Button>
							<Button
								icon={<FaLinkedin />}
								onClick={
									() => windowHelpers.openNewTab("https://www.linkedin.com/in/nicolaikozel/")
								}
							>
								LinkedIn
							</Button>
						</ButtonsContainer>
					</SectionContainer>
				</SectionFullHeight>
			</>
		)
	}
}

export default withHeaderAndFooter(About)
