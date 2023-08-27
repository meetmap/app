import styled from "styled-components/native";
import React, { ReactNode } from 'react'
import { TextcolorsType } from "../Text";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ButtonType, IPrimaryButton } from "./PrimaryButton";

const PrimaryMediumButton = ({ children, btnType = "Primary", title, textColor, ...rest }: IPrimaryButton) => {
    return (
        <StyledPrimaryButton btnType={btnType} {...rest}>
            {children}
            {title &&
                <StyledPrimaryButtonText textColor={textColor} btnType={btnType}>{title}</StyledPrimaryButtonText>
            }
        </StyledPrimaryButton>
    )
}

export default PrimaryMediumButton

const StyledPrimaryButton = styled(TouchableOpacity) <{ btnType: ButtonType }>`
    flex-direction: row;
    padding: 12px 12px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    background: ${props => props.theme.colors.BUTTON[props.btnType].BGDefault};
    border: solid 1px ${props => props.theme.colors.BUTTON[props.btnType].BorderDefault};
    border-radius: 14px;
`

const StyledPrimaryButtonText = styled(Text) <{ btnType: ButtonType, textColor?: TextcolorsType }>`
    color: ${props => props.textColor ? props.theme.colors.TEXT[props.textColor] : props.theme.colors.BUTTON[props.btnType].TextDefault};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    letter-spacing: -0.28px;
`