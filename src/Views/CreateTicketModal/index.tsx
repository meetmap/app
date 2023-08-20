import React from 'react'
import { KeyboardAvoidingView, Modal, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { H5 } from '../../shared/Text'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../types/NavigationProps'

const CreateTicketModal = ({ }) => {
    const navigation = useNavigation<NavigationProps>()
    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{ flex: 1, backgroundColor: "#00000067", alignItems: "stretch", justifyContent: "center", paddingHorizontal: 16 }}>
                <StyledTicketForm activeOpacity={1}>
                    {/* <H5>Create ticket</H5> */}
                    <StyledInputsContent>
                        <PrimaryFormInput label='Ticket name' placeholder='Awesome ticket' inputStyle='Primary'/>
                        <PrimaryFormInput label='Ticket description' placeholder='Something about ticket' inputStyle='Primary'/>
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput label='Ticket amount' placeholder='Ex. 10' inputStyle='Primary'/>
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput label='Ticket price' placeholder='Price in $' inputStyle='Primary'/>
                            </View>
                        </View>
                    </StyledInputsContent>
                    <PrimaryButton title='Create ticket' />
                </StyledTicketForm>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default CreateTicketModal

const StyledTicketForm = styled.TouchableOpacity`
    background-color: white;
    padding: 16px;
    border-radius: 18px;
    gap: 12px;
`
const StyledInputsContent = styled.View`
    gap: 8px;
`