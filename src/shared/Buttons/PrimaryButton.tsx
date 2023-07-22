import styled from "styled-components/native";

import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Button, ButtonProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

export type ButtonType = "Primary" | "Secondary" | "White" | "Black"

export interface IPrimaryButton extends TouchableOpacityProps {
    btnType?: ButtonType,
    textColor?: TextcolorsType
    children?: ReactNode
    title?: string
}

const PrimaryButton = ({ children, btnType = "Primary", title, textColor, ...rest }: IPrimaryButton) => {
    return (
        <StyledPrimaryButton btnType={btnType} {...rest }>
            {children}
            <StyledPrimaryButtonText textColor={textColor} btnType={btnType}>{title}</StyledPrimaryButtonText>
        </StyledPrimaryButton>
    )
}

export default PrimaryButton

const StyledPrimaryButton = styled(TouchableOpacity) <{ btnType: ButtonType }>`
    flex-direction: row;
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