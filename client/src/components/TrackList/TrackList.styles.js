import styled from "styled-components"
import { Colors } from "../../constants/branding"

export const Container = styled.div`
    padding: 30px 30px 44px 30px;

    background-color: ${Colors.CARD_BACKGROUND_ALT};
    color: ${Colors.HEADLINE};
`

export const TrackListTable = styled.table`
    margin-top: 20px;
    width: 100%;

    border-collapse: collapse;
    text-align: left;

    th {
        font-size: 16px;
    }

    td {
        font-size: 14px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    th, td { 
        border-bottom: 1px solid rgba(114, 117, 126, 0.3);
        padding: 10px;
    }

    tbody tr:hover {
        background-color: ${Colors.HIGHLIGHT};
    }
`

export const LoadingContainer = styled.div`
    div {
        margin: 0 auto;
    }
`

export const PlayButtonContainer = styled.div`
    position: relative;
    top: 2px;

    cursor: pointer;
    font-size: 25px;
    opacity: 0.7;
    
    :hover {
        opacity: 1;
    }
`

export const ViewTabButtonContainer = styled.div`
    cursor: pointer;
    font-weight: 600;

    :hover {
        text-decoration: underline;
    }
`