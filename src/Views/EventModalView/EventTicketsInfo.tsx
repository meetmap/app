import React from 'react'
import { ITicketResponse } from '@src/types/event'
import { H3 } from '@src/shared/Text'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import PrimaryTicket from '@src/shared/Ticket/PrimaryTicket'

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
