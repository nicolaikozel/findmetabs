import styled from "styled-components"
import { MdClose } from "react-icons/md"

import { Colors } from "../../constants/branding"

export const ModalContainer = styled.div`
    display: flex;
    align-items: center;
    
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    
    width:100%;
    height: 100%;
    
    background: rgba(0, 0, 0, 0.7);
    overflow: auto;
    z-index: 100;
`

export const ModalContent = styled.div`
    position: relative;
    overflow: visible;

    box-sizing: border-box;
    max-height: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 8px;
    
    background: ${Colors.BACKGROUND};
    overflow: auto;
`

export const ModalHeader = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid ${Colors.PARAGRAPH};
    margin-bottom: 10px;

    text-align: center;

    h1 {
        margin: 0;

        color: ${Colors.HEADLINE};
        font-size: 28px;
    }
`

export const ModalCloseIcon = styled(MdClose)`
    position: absolute;
    top: 8px;
    right: 8px;

    color: ${Colors.HEADLINE};
    font-size: 30px;

    cursor: pointer;
`

export const ModalMain = styled.div`
    padding: 20px;
    min-width: 500px;
`

export const ModalFooter = styled.div`
    display: flex;

    padding: 0 20px 20px 20px;
    justify-content: flex-end;

    button {
        width: 15%;
    }
`