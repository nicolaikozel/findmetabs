import styled from "styled-components"

import { Colors } from "../../constants/branding"

export const ToastNotificationContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    top: 10px;
    left: 50.1%;
    
    transform: ${props => props.visible ? "translate3d(-50.1%, 0, 0)" : "translate3d(-50.1%, -100px, 0)"};
    transition: transform 0.5s ease-in-out;

    padding: 18px 20px;

    background-color: ${Colors.HIGHLIGHT};
    color: ${Colors.HEADLINE};
    font-size: 18px;

    z-index: 15;
`

export const IconContainer = styled.div`
    margin-right: 10px;

    font-size: 20px;
`