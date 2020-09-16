import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const Section = styled.div`
    padding: 30px 0 75px 0;

    background-color: ${Colors.BACKGROUND};
    color: ${Colors.PARAGRAPH};
`

export const SectionAlt = styled(Section)`
    padding-top: 75px;

    background-color: ${Colors.BACKGROUND_ALT};
`


export const SectionContainer = styled.div`
    margin-right: auto;
    margin-left: auto;

    max-width: ${ props => props.maxWidth ? props.maxWidth : "1040px"};
`

export const SectionTitleContainer = styled.div`
    margin-bottom: 50px;

    text-align: center;
`

export const SectionTitle = styled.h1`
    margin: 0px;

    color: ${Colors.HEADLINE};
`

export const SectionSubTitle = styled.h3`
    font-size: 22px;
    font-weight: normal;
`

export const SectionFullHeight = styled(Section)`
    min-height: calc(100vh - 288px);
`