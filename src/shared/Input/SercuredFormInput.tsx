import styled from "styled-components/native";
import React, { ReactNode, useState } from 'react'
import { TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { Span } from "../Text";
import EyeIcon from "../Icons/Eye";

interface IPrimaryFormInput extends TextInputProps {
    name: string
    label: string
    isSuccess?: boolean
    isError?: boolean | string
    icon?: ReactNode
}

const SercuredFormInput = ({ name, label, ...rest }: IPrimaryFormInput) => {
    const [passwordHidden, setPasswordHidden] = useState(true)
    return (
        <StyledInputContent>
            <Span>{label}</Span>
            <StyledInputWrapper>
                <StyledPrimaryInput secureTextEntry={passwordHidden} {...rest} id={name} autoCapitalize="none" />
                <StyledSetVisiblePassword
                    onPressIn={() =>  setPasswordHidden(false)}
                    onPressOut={() =>  setPasswordHidden(true)}
                >
                    <EyeIcon/>
                </StyledSetVisiblePassword>
            </StyledInputWrapper>
        </StyledInputContent>
    )
}

export default SercuredFormInput

const StyledInputContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`
const StyledInputWrapper = styled(View)`
    position: relative;
`
const StyledSetVisiblePassword = styled(TouchableOpacity)`
    position: absolute;
    right: 8px;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 14px;
`
const StyledPrimaryInput = styled(TextInput)`
    width: 100%;
    background-color: transparent;
    padding: 18px 50px 18px 24px;
    border: none;

    background: #FFFFFF;
    border-radius: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: black;
`