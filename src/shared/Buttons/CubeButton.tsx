import styled from "styled-components/native";

import React, { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from "react-native";


interface ICubeButton extends TouchableOpacityProps {
    children: ReactNode
}

export const CubeButton = ({ children, ...rest }: ICubeButton) => {
    return (
        <StyledCubeButton {...rest}>
            {children}
        </StyledCubeButton>
    )
}

const StyledCubeButton = styled(TouchableOpacity)`
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 18px; 
    pointer-events: auto;
    height: 48px;
    width: 48px;
    border: solid 1px #DDE2ED;
`
