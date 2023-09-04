import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { P, Span } from '@src/shared/Text'
import { useAppSelector } from '@src/store/hooks'
import PrimaryTicket from '@src/shared/Ticket/PrimaryTicket'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'

const CreateTicketsComponent = () => {
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
    const navigation = useNavigation<NavigationProps>()
    return (
        <View style={{ gap: 6 }}>
            <Span>Tickets</Span>
            <FlatList
                data={eventFormValues.tickets}
                horizontal
                contentContainerStyle={{ gap: 6 }}
                ListHeaderComponent={
                    <StyledCreateTicket onPress={() => navigation.navigate("CreateTicketModal", { ticketIndex: undefined })} style={{ alignItems: "center", justifyContent: "center" }}>
                        <P textcolor='Primary'>+ Create ticket</P>
                    </StyledCreateTicket>
                }
                renderItem={({ item, index }) => (
                    <PrimaryTicket
                        onPress={() => navigation.navigate("CreateTicketModal", { ticketIndex: index })}
                        ticket={item}
                    />
                )}
            />
        </View>
    )
}

export default CreateTicketsComponent

const StyledCreateTicket = styled(TouchableOpacity)`
  border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
  width: 200px;
  height: 150px;
  gap: 6px;
  padding: 16px;
  justify-content: space-between;
  border-radius: 16px;
`