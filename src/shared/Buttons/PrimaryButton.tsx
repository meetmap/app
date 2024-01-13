import styled, { css } from "styled-components/native";

import React, { ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

export type ButtonSizeType = "sm" | "md" | "lg"

export type ButtonType = "Primary" | "Secondary" | "White" | "Black" | "Error"

export interface IPrimaryButton extends TouchableOpacityProps {
    btnType?: ButtonType,
    textColor?: TextcolorsType
    children?: ReactNode
    title?: string
    btnSize?: ButtonSizeType
}

export const PrimaryButton = ({
    btnSize = "lg",
    children,
    btnType = "Primary",
    title,
    textColor,
    ...rest
}: IPrimaryButton) => {
    return (
        <StyledPrimaryButton btnSize={btnSize} btnType={btnType} {...rest}>
            {children}
            {title && <StyledPrimaryButtonText btnSize={btnSize} textColor={textColor} btnType={btnType}>{title}</StyledPrimaryButtonText>}
        </StyledPrimaryButton>
    )
}



const defineSize = ({ btnSize }: IPrimaryButton) => {
    switch (btnSize) {
        case "lg":
            return css`
                padding: 20px 24px;
                gap: 8px;
                border-radius: 20px;
            `
        case "md":
            return css`
                padding: 12px 12px;
                gap: 8px;
                border-radius: 14px;
            `
        case "sm":
            return css`
                padding: 10px 16px;
                gap: 4px;
                border-radius: 20px;
            `
    }
}
const defineFontSize = ({ btnSize }: IPrimaryButton) => {
    switch (btnSize) {
        case "lg":
            return css`
                font-size: 16px;
                font-weight: 600;
            `
        case "md":
            return css`
                font-size: 14px;
                font-weight: 500;
            `
        case "sm":
            return css`
                font-size: 12px;
                font-weight: 500;
            `
    }
}

const StyledPrimaryButton = styled(TouchableOpacity) <IPrimaryButton>`
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: ${props => props.theme.colors.BUTTON[props.btnType!].BGDefault};
    border: solid 1px ${props => props.theme.colors.BUTTON[props.btnType!].BorderDefault};

    ${defineSize}
`

const StyledPrimaryButtonText = styled(Text) <{ btnType: ButtonType, textColor?: TextcolorsType, btnSize: ButtonSizeType }>`
    color: ${props => props.textColor ? props.theme.colors.TEXT[props.textColor] : props.theme.colors.BUTTON[props.btnType].TextDefault};
    font-style: normal;

    ${defineFontSize}
`