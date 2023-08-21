import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Modal, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { H5 } from '../../shared/Text'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps, RootStackParamList } from '../../types/NavigationProps'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ITicket } from '../CreateEventView'
import { setTicketsState } from '../../store/slices/createEventFormSlice'
import ConfirmAlert from '../../shared/Alerts/ConfirmAlert'

interface ICreateTicketModal {
    navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTicketModal'>;
    route: {
        params: {
            ticketIndex?: number
        }
    }
}

const CreateTicketModal = ({ route }: ICreateTicketModal) => {
    const ticketIndex = route.params.ticketIndex
    const navigation = useNavigation<NavigationProps>()
    const { tickets } = useAppSelector(state => state.createEventFormSlice.eventFormValues)
    const [localTicketValue, setLocalTicketValue] = useState<ITicket>(ticketIndex !== undefined ? tickets[ticketIndex] : {
        description: "",
        name: "",
        amount: 0,
        price: 0
    })
    const dispatch = useAppDispatch()
    const handleChangeTicketsValue = () => {
        if (ticketIndex === undefined) {
            dispatch(setTicketsState([...tickets, localTicketValue]))
        } else {
            const updatedTickets = tickets.map((ticket, index) =>
                index === ticketIndex ? localTicketValue : ticket
            );
            dispatch(setTicketsState(updatedTickets));
        }
        navigation.goBack();
    }

    
    const handleDeleteTicket = () => {
        if (ticketIndex === undefined) {
            return;
        }
        const updatedTickets = tickets.filter((_, index) => index !== ticketIndex);
        dispatch(setTicketsState(updatedTickets));
        navigation.goBack();
    };


    const handleChangeLocalTicketValue = (key: keyof ITicket, value: string) => {
        setLocalTicketValue((state => ({ ...state, [key]: value })))
    }
    const setFiltersStringValues = (valueKey: keyof ITicket, value: string) => {
        setLocalTicketValue((state => ({ ...state, [valueKey]: +value.replace(/[^0-9]/g, '') })))
      }
    return (
        <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1} style={{ flex: 1, backgroundColor: "#00000067", alignItems: "stretch", justifyContent: "center", paddingHorizontal: 16 }}>
                <StyledTicketForm onPress={() => Keyboard.dismiss()} activeOpacity={1}>
                    {/* <H5>Create ticket</H5> */}
                    <StyledInputsContent>
                        <PrimaryFormInput value={localTicketValue.name} onChangeText={(value) => handleChangeLocalTicketValue("name", value)} label='Ticket name' placeholder='Awesome ticket' inputStyle='Primary' />
                        <PrimaryFormInput style={{ minHeight: 80 }} multiline value={localTicketValue.description} onChangeText={(value) => handleChangeLocalTicketValue("description", value)} label='Ticket description' placeholder='Something about ticket' inputStyle='Primary' />
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput value={localTicketValue.amount.toString()} onChangeText={(value) => setFiltersStringValues("amount", value)} keyboardType='numeric' label='Ticket amount' placeholder='Ex. 10' inputStyle='Primary' />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput value={localTicketValue.price.toString()} onChangeText={(value) => setFiltersStringValues("price", value)} keyboardType='numeric' label='Ticket price' placeholder='Price in $' inputStyle='Primary' />
                            </View>
                        </View>
                    </StyledInputsContent>
                    {ticketIndex === undefined ?
                        <PrimaryButton onPress={handleChangeTicketsValue} title={'Create ticket'} /> :
                        <View style={{ flexDirection: "row", gap: 8 }}>
                            <PrimaryButton style={{ flex: 1 }} onPress={handleChangeTicketsValue} title={'Change ticket'} />
                            <PrimaryButton btnType='Error' onPress={() => ConfirmAlert(handleDeleteTicket, "Do you really want to delete this ticket?")} title={"Delete"} />
                        </View>
                    }
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