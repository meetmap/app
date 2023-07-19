import styled from "styled-components/native";

import React, { ReactNode } from 'react'
import { TextInput, TextInputProps, View } from "react-native";
import { Text } from "react-native-svg";
import { H1, Span } from "../Text";

interface IPrimaryFormInput extends TextInputProps {
    name: string
    label: string
    isSuccess?: boolean
    isError?: boolean | string
    icon?: ReactNode
}

const PrimaryFormInput = ({ name, label, isSuccess, isError, icon, ...rest }: IPrimaryFormInput) => {
    return (
        <StyledInputContent>
            <Span>{label}</Span>
            <StyledInputWrapper>
                <StyledPrimaryInput {...rest} id={name} autoCapitalize="none"/>
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

const StyledPrimaryInput = styled(TextInput)`
    width: 100%;
    background-color: transparent;
    padding: 18px 50px 18px 24px;
    border: none;

    background: #FFFFFF;
    border-radius: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 16;
    color: black;
    ::placeholder{
        color: #898F99;
    }
`