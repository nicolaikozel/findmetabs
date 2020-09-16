import styled from "styled-components"

import { Section, SectionFullHeight } from "../../components/Layout"
import { Colors } from "../../constants/branding"

export const ContentContainer = styled.div`
    display: ${props => props.loaded ? "block" : "none"};
`

export const LoadingContainer = styled(SectionFullHeight)`
    display: ${props => props.loaded ? "none" : "block"};
`

export const WaveContainer = styled.div`
    @keyframes animateWave {
        0% {
        transform: scale(1,0);
        }
        100% {
        transform: scale(1,1);
        }
    }

    background: ${Colors.BACKGROUND};

    bottom: 0;
    position: absolute;

    width: 100%;
    
    svg {
        display: block;
        transform-origin: bottom;
        animation: animateWave 1000ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
    }
`

export const SuggestionSection = styled(Section)`
    position: relative;

    padding-bottom: 0px;
`

export const SuggestionContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;

    > * {
        z-index: 10;
    }
`

export const SuggestionTitle = styled.h1`
    margin: 0;

    color: ${Colors.HEADLINE};

    font-size: 30px;
`

export const SuggestionArtist = styled.h2`
    margin: 0;
`

export const SuggestionAlbumArt = styled.img`
    margin: 20px 0;
`

export const SuggestionActions = styled.div`
    display: flex;
    
    margin-top: 10px;

    width: 70%;
    
    button {
        width: 33%;
    }

    button:not(:last-child) {
        margin-right: 15px;
    }
`

export const SongSuggestionCardsContainer = styled.div`
    display: flex;

    > div {
        width: 45%;

        &:not(:last-child) {
            margin-right: 30px;
        }
    }
`