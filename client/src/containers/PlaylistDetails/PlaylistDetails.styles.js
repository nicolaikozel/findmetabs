import styled from "styled-components"
import { Colors } from "../../constants/branding"

export const BackButton = styled.button`
    align-items: center;
    display: flex;

    margin-bottom: 30px;
    border: none;
    padding: 0;

    background: none;
    color: ${Colors.HEADLINE};
    cursor: pointer;
    font-size: 16px;
    text-decoration: none;
    opacity: 0.8;

    svg {
        margin-right: 5px;

        font-size: 22px;
    }

    :hover {
        opacity: 1;
    }
`