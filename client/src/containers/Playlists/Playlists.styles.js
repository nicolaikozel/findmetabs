import styled from "styled-components"

export const PlaylistCardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    
    > div:first-child {
        margin: 0 auto 5px auto;
        width: calc(100% - 1.4em);
    }

    > div:not(:first-child) {
        flex: 0 1 450px;
        box-sizing: border-box;
        margin: 0.5rem 0.5em;

        @media screen and (min-width: 50em) {
            max-width: calc(50% - 1em);
        }

        @media screen and (min-width: 65em) {
            max-width: calc(33% - 0.8em);
        }
    }
`

export const LoadingContainer = styled.div`
    div {
        margin: 0 auto;
    }
`