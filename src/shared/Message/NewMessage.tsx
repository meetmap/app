import React from 'react'
import MessagePinIcon from '../Icons/MessagePinIcon'
import { styled } from 'styled-components'
import { TextInput, TextInputProps, View } from 'react-native'

export type IMessageStyleType = "White" | "Primary"

export interface INewMessage extends TextInputProps {
    inputStyle?: IMessageStyleType
}

const NewMessage = ({ inputStyle = "Primary", ...rest }: INewMessage) => {
    return (
        <StyledNewMessageWrapper>
            <StyledNewMessage multiline inputStyle={inputStyle} {...rest}>

            </StyledNewMessage>
            <StyledPinWrapper>
                <MessagePinIcon />
            </StyledPinWrapper>
        </StyledNewMessageWrapper>
    )
}

export default NewMessage

const StyledNewMessage = styled(TextInput) <{ inputStyle: IMessageStyleType }>`
    border-radius: 20px 16px 0px 20px;
    padding: 18px 16px;
    background: ${props => props.theme.colors.INPUT[props.inputStyle].BGColor};
`
const StyledNewMessageWrapper = styled(View)`
    
`
const StyledPinWrapper = styled(View)`
    position: absolute;
    left: 100%;
    bottom: 0;
`