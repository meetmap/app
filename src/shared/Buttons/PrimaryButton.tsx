import styled from "styled-components/native";

import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Button, ButtonProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export type ButtonType = "Primary" | "Secondary" | "White" | "Black"

interface IPrimaryButton extends TouchableOpacityProps {
    btnType?: ButtonType,
    textColor?: TextcolorsType
    children: ReactNode
}

const PrimaryButton = ({ children, btnType = "Primary", textColor, ...rest }: IPrimaryButton) => {
    return (
        <StyledPrimaryButton btnType={btnType} {...rest }>
            <StyledPrimaryButtonText textColor={textColor} btnType={btnType}>{children}</StyledPrimaryButtonText>
        </StyledPrimaryButton>
    )
}

export default PrimaryButton

const StyledPrimaryButton = styled(TouchableOpacity) <{ btnType: ButtonType }>`
    display: flex;
    padding: 20px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    background: ${props => props.theme.colors.BUTTON[props.btnType].BGDefault};
    border: solid 1px ${props => props.theme.colors.BUTTON[props.btnType].BorderDefault};
    border-radius: 20px;
`

const StyledPrimaryButtonText = styled(Text)<{btnType: ButtonType, textColor?: TextcolorsType}>`
    color: ${props => props.textColor ? props.theme.colors.TEXT[props.textColor] : props.theme.colors.BUTTON[props.btnType].TextDefault};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`