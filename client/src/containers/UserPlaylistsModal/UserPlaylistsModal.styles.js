import styled, { css } from "styled-components"

import { Colors } from "../../constants/branding"

export const LoadingContainer = styled.div`
    div {
        margin: 0 auto;
    }
`

const playlistCardSelectedStyled = css`
    background-color: ${Colors.HIGHLIGHT};

    div {
        background-color: ${Colors.BACKGROUND};
    }

    cursor: pointer;
`

export const PlaylistsContainer = styled.div`
    max-height: 500px;
    margin-top: 15px;
    overflow-y: auto;
    overflow-x: hidden;

    > div:not(:last-child) {
        margin-bottom: 15px;
    }

    ::-webkit-scrollbar {
        width: 18px;
        background-color: ${Colors.BACKGROUND};
    }

    ::-webkit-scrollbar-thumb {
        border: 7px solid rgba(0, 0, 0, 0);
        background-clip: padding-box;
        -webkit-border-radius: 7px;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-track {
        background-color: ${Colors.BACKGROUND};
    }

    ::-webkit-scrollbar-button {
        width: 0;
        height: 0;
        display: none;
    }

    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }
`

export const PlaylistCard = styled.div`
    padding: 20px 30px 30px 30px;
    border-radius: 8px;

    background-color: ${Colors.BACKGROUND_ALT};

    h2 {
        font-size: 20px;
        font-weight: 600;
        margin: 0 0 12px 0;
    }

    :hover{
        ${playlistCardSelectedStyled};
    }

    ${props => props.selected ? playlistCardSelectedStyled : null}
`

export const Badge = styled.div`
    display: inline;

    padding: 5px 15px;
    border-radius: 100px;

    background-color: ${Colors.HIGHLIGHT};
    color: ${Colors.HEADLINE};
    font-size: 14px;
`

export const Title = styled.h2`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 425px;
`