import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const ContentContainer = styled.div`
    display: flex;

    margin-top: 30px;

    color: ${Colors.HEADLINE};
    font-size: 18px;
    text-align: left;

    p {
        margin-top: 0px;
    }

    a {
        color: ${Colors.PRIMARY};
        font-weight: bold;
    }
`

export const Me = styled.img`
    margin-left: 50px;

`

export const ButtonsContainer = styled.div`
    display: flex;

    button {
        width: 185px;

        margin-right: 10px;
        padding: 10px;
    }
`