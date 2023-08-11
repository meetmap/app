import styled from "styled-components/native";

import React, { ReactNode } from 'react'
import { TextInput, TextInputProps, View } from "react-native";
import { Text } from "react-native-svg";
import { H1, Span } from "../Text";

interface IPrimaryFormInput extends TextInputProps {
    name?: string
    label?: string
    isSuccess?: boolean
    isError?: boolean | string
    icon?: ReactNode
    inputStyle?: "White" | "Primary"
}

const PrimaryFormInput = ({ name, label, isSuccess, inputStyle = "White", isError, icon, ...rest }: IPrimaryFormInput) => {
    return (
        <StyledInputContent>
            {label &&
                <Span>{label}</Span>
            }
            <StyledInputWrapper>
                <StyledPrimaryInput inputStyle={inputStyle} {...rest} id={name} autoCapitalize="none" />
                <StyledInputStatus>
                    {/* <AnimatePresence>
                        {isSuccess && <SuccessIcon />}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isError && <ErrorIcon />}
                    </AnimatePresence> */}
                </StyledInputStatus>
                <StyledInputIcon>
                    {/* <AnimatePresence>
                        {!isError && !isSuccess && icon}
                    </AnimatePresence> */}
                </StyledInputIcon>
            </StyledInputWrapper>
        </StyledInputContent>
    )
}

export default PrimaryFormInput

const StyledInputContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`
const StyledInputWrapper = styled(View)`
    position: relative;
`
const StyledInputStatus = styled(View)`
    position: absolute;
    right: 24px;
    display: flex;
`
const StyledInputIcon = styled(StyledInputStatus)``

const StyledPrimaryInput = styled(TextInput) <{ inputStyle: "Primary" | "White" }>`
    padding: 18px 50px 18px 24px;
    border: none;

    background: ${props => props.theme.colors.INPUT[props.inputStyle].BGColor};
    border-radius: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: black;
`