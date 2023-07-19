import styled from "styled-components/native";

import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Button, ButtonProps, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { ButtonType } from "./PrimaryButton";

interface IPrimaryButton extends TouchableOpacityProps {
    btnType?: ButtonType,
    textColor?: TextcolorsType
    children: ReactNode
}

const PrimarySmallButton = ({ children, btnType = "Primary", textColor, ...rest }: IPrimaryButton) => {
    return (
        <StyledPrimarySmallButton btnType={btnType} {...rest }>
            <StyledPrimaryButtonText textColor={textColor} btnType={btnType}>{children}</StyledPrimaryButtonText>
        </StyledPrimarySmallButton>
    )
}
export default PrimarySmallButton

const StyledPrimarySmallButton = styled(TouchableOpacity) <{ btnType: ButtonType, textColor?: TextcolorsType }>`
    display: flex;
    gap: 4px;
    padding: 10px 16px;
    justify-content: center;
    align-items: center;

    background: ${props => props.theme.colors.BUTTON[props.btnType].BGDefault};
    border-radius: 20px;
    border: solid 1px ${props => props.theme.colors.BUTTON[props.btnType].BorderDefault};
    transition: color .2s ease, border .2s ease, background .2s ease;
`

const StyledPrimaryButtonText = styled(Text)<{btnType: ButtonType, textColor?: TextcolorsType}>`
    color: ${props => props.textColor ? props.theme.colors.TEXT[props.textColor] : props.theme.colors.BUTTON[props.btnType].TextDefault};
    font-size: 12;
    font-style: normal;
    font-weight: 500;
`