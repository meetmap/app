import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { IEvent } from '../../types/event'
import EventLg from '../../shared/EventInList/EventLg'
import TextStatus from '../../shared/TextStatus'
import LoaderContainer from '../../shared/LoaderContainer'
import { getEventsListByIds } from '../../api/events'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import { H1 } from '../../shared/Text'


export interface IEventsListModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventsListModalView'>;
}


const EventsListModalView = ({ route }: IEventsListModalViewProps) => {
    const [eventsListData, setEventsListData] = useState<IEvent[] | null>(null)
    const [eventsListDataLoading, setEventsListDataLoading] = useState<boolean>(false)

    const getEventsByIds = async () => {
        setEventsListDataLoading(true)
        const eventsData = await getEventsListByIds(route.params.eventIds)
        setEventsListData(eventsData)
        setEventsListDataLoading(false)
    }
    useEffect(() => {
        getEventsByIds()
    }, [])

    if (eventsListDataLoading) {
        return (
            <LoaderContainer />
        )
    }
    if (!eventsListData) {
        return (
            <TextStatus>Something went wrong</TextStatus>
        )
    }
    return (
        <StyledEventsListModal>
            <H1>Events in this place</H1>
            <FlatList
                contentContainerStyle={{ paddingBottom: 25 }}
                data={eventsListData}
                horizontal={false}
                scrollEnabled
                renderItem={({ item }) => <EventLg eventData={item} />}
                keyExtractor={item => item.id}
            />
        </StyledEventsListModal>
    )
}

export default EventsListModalView


const StyledEventsListModal = styled(View)`
    flex-direction: column;
    padding: 16px 16px 0 16px;
    gap: 8px;
`

