import React from "react"
import { AiFillCustomerService } from "react-icons/ai"
import { MdSettings, MdQueueMusic } from "react-icons/md"
import { FaSpotify } from "react-icons/fa"

import guitar_and_tab from "../../assets/images/guitar_and_tab.png"
import config from "../../config"

import redirectIfAuthorized from "../../HOC/redirectIfAuthorized"
import withHeaderAndFooter from "../../HOC/withHeaderAndFooter"
import Card from "../../components/Card"
import {
	Section,
	SectionAlt,
	SectionContainer,
	SectionSubTitle,
	SectionTitle,
	SectionTitleContainer,
} from "../../components/Layout"

import {
	Button,
	ButtonIconContainer,
	CardContainer,
	Headline,
	Hero,
	HeroImage,
} from "./Landing.styles"

class Landing extends React.PureComponent {
	render() {
		return (
			<>
				<Section>
					<SectionContainer>
						<Hero>
							<Headline>
								Discover songs to learn based on music you love.
							</Headline>
							<Button
								onClick={() => {
									window.location.assign(
										`${config.API_URL}/api/spotify/authorization/login`,
									)
								}}
							>
								<ButtonIconContainer>
									<FaSpotify />
								</ButtonIconContainer>
								LOG IN WITH SPOTIFY
							</Button>
							<HeroImage src={guitar_and_tab} width="750px" />
						</Hero>
					</SectionContainer>
				</Section>
				<SectionAlt>
					<SectionContainer>
						<SectionTitleContainer>
							<SectionTitle>Features</SectionTitle>
							<SectionSubTitle>
								Finding songs you want to learn can be
								difficult. Find Me Tabs can help.
							</SectionSubTitle>
						</SectionTitleContainer>
						<CardContainer>
							<Card
								title="Song Suggestions"
								icon={<AiFillCustomerService />}
								content="Find Me Tabs connects with your Spotify library 
								and suggests songs for you to learn based on what you listen to, 
								so you can always be excited about what you're learning."
							/>
							<Card
								title="Automatically Find Tabs"
								icon={<MdSettings />}
								content="For each suggestion, available tabs are automatically found on Ultimate Guitar and accessible with a single click."
							/>
							<Card
								title="Create and Edit Playlists"
								icon={<MdQueueMusic />}
								content="Create and edit Spotify playlists of songs you're learning 
								so you can finally nail that tricky solo after memorizing the song inside and out!"
							/>
						</CardContainer>
					</SectionContainer>
				</SectionAlt>
			</>
		)
	}
}

export default redirectIfAuthorized(withHeaderAndFooter(Landing))
