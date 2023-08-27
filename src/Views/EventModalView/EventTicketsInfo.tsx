import React from 'react'
import { ITicket, ITicketResponse } from '../../types/event'
import { H3, H6, P } from '../../shared/Text'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import PrimaryTicket from '../../shared/Ticket/PrimaryTicket'

interface IEventTicketsInfo {
    tickets: ITicketResponse[]
}
const EventTicketsInfo = ({ tickets }: IEventTicketsInfo) => {
    const { t } = useTranslation()
    if (tickets.length > 0) {
        return (
            <StyledTicketsView>
                <H3 style={{ paddingHorizontal: 16 }}>{t("tickets")}</H3>
                <FlatList
                    contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
                    data={tickets}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    scrollEnabled
                    renderItem={({ item }) => (
                        <PrimaryTicket
                            ticket={{
                                amount: item.amount,
                                price: item.price.amount,
                                description: item.description,
                                name: item.name
                            }}
                            style={{ height: 140}}
                        />
                    )}
                    keyExtractor={item => item.name}
                />
            </StyledTicketsView>
        )
    }
    return null
}

export default EventTicketsInfo

const StyledTicketsView = styled(View)`
    gap: 12px;
    /* padding: 0 -16px; */
`

const StyledTicket = styled(View)`
    width: 200px;
    gap: 6px;
    padding: 8px;
    border-radius: 8px;
    border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
`
const StyledTicketHeader = styled(View)`
    justify-content: space-between;
    flex-direction: row;
    gap: 6px;
`