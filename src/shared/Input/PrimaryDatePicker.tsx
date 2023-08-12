import styled from "styled-components/native";

import React, { ReactNode, useState } from 'react'
import { TextInput, TextInputProps, View, Text, Modal, Button, TouchableOpacity } from "react-native";
import { H1, Span } from "../Text";
import RNDateTimePicker, { DatePickerOptions } from "@react-native-community/datetimepicker";

interface IPrimaryDatePicker extends DatePickerOptions {
    name?: string
    label?: string
    isSuccess?: boolean
    isError?: boolean | string
    icon?: ReactNode
    inputStyle?: "White" | "Primary"
    placeholder?: string
    initialValue?: Date
}

const PrimaryDatePicker = ({ inputStyle = "Primary", initialValue, placeholder = "Pick date", name, label, ...rest }: IPrimaryDatePicker) => {
    const [opened, setOpened] = useState(false)
    return (
        <>
            <StyledInputContent>
                {label &&
                    <Span>{label}</Span>
                }
                <StyledPrimaryDatePikerButton inputStyle={inputStyle} onPress={() => setOpened(data => !data)}>
                    <StyledPrimaryDatePikerButtonText>
                        {rest.value.toDateString() == initialValue?.toDateString() ?
                            placeholder : rest.value.toDateString()
                        }
                    </StyledPrimaryDatePikerButtonText>
                </StyledPrimaryDatePikerButton>
            </StyledInputContent>
            <Modal
                visible={opened}
                animationType="slide"
                onRequestClose={() => setOpened(false)}
                transparent={true}
            >
                <StyledModalBackground activeOpacity={1} onPress={() => setOpened(false)}>
                    <StyledPickDateModal>
                        <RNDateTimePicker
                            testID="dateTimePicker"
                            mode={"date"}
                            display="spinner"
                            {...rest}
                        />
                        <Button title="Submit" onPress={() => setOpened(false)} />
                    </StyledPickDateModal>
                </StyledModalBackground>
            </Modal>
        </>
    )
}

export default PrimaryDatePicker

const StyledInputContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`

const StyledPrimaryDatePikerButton = styled(TouchableOpacity) <{ inputStyle: "Primary" | "White" }>`
    width: 100%;
    padding: 18px 24px;
    border: none;
    background: ${props => props.theme.colors.INPUT[props.inputStyle].BGColor};
    border-radius: 20px;
`

const StyledPrimaryDatePikerButtonText = styled(Text)`
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: black;
`

const StyledModalBackground = styled(TouchableOpacity)`
    flex: 1;
    background-color: #00000067;
`
const StyledPickDateModal = styled(View)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 24px;
    padding: 16px;
    /* gap: 16px; */
    /* flex: 1; */
`