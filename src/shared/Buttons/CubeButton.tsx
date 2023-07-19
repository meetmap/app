import styled from "styled-components/native";

import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Button, ButtonProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { ButtonType } from "./PrimaryButton";


interface IPrimaryButton extends TouchableOpacityProps {
    children: ReactNode
}

const PrimaryButton = ({ children, ...rest }: IPrimaryButton) => {
    return (
        <StyledPrimaryButton {...rest}>
            {children}
        </StyledPrimaryButton>
    )
}

export default PrimaryButton

const StyledPrimaryButton = styled(TouchableOpacity)`
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 18px; 
    pointer-events: auto;
    height: 48px;
    width: 48px;
`
