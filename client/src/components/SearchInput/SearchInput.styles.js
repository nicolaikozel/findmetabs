import styled from "styled-components"
import { MdClose, MdSearch } from "react-icons/md"

import { Colors } from "../../constants/branding"

export const InputContainer = styled.div`
    position: relative;
`

export const SearchIcon = styled(MdSearch)`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);

    color: ${Colors.HEADLINE};
    font-size: 20px;

    z-index: 1;
`

export const ClearIcon = styled(MdClose)`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);

    color: ${Colors.HEADLINE};
    font-size: 20px;

    cursor: pointer;
    opacity: 0.8;
    z-index: 1;

    :hover {
        opacity: 1;
    }
`

export const Input = styled.input`
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 10px 38px;
    width: 100%;
    opacity: 0.8;

    color: ${Colors.HEADLINE};
    background: ${Colors.SECONDARY};

    ::placeholder {
        color: ${Colors.HEADLINE};
        opacity: 0.7;
    }

    :focus {
        opacity: 1;
    }
`