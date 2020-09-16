import styled from "styled-components"

export const ErrorNotificationContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -35%);

    button {
        width: 200px;
    }
`

export const ErrorMessageContainer = styled.div`
    margin: 30px 0;

    text-align: center;
    
    p {
        margin: 0;
    }
`