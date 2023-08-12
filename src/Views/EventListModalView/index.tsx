import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { IEvent } from '../../types/event'
import EventLg from '../../shared/EventInList/EventLg'
import TextStatus from '../../shared/TextStatus'
import LoaderContainer from '../../shared/LoaderContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import { H1 } from '../../shared/Text'
import { useTranslation } from 'react-i18next'
import useAxios from '../../hooks/useAxios'
import { getEventsListByCids } from '../../api/events'
import { IPaginateRespose } from '../../types/response'


export interface IEventsListModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventsListModalView'>;
}


const EventsListModalView = ({ route }: IEventsListModalViewProps) => {
    const { data, loading, error } = useAxios<IPaginateRespose<IEvent>>(getEventsListByCids(route.params.eventCids))
    const { t } = useTranslation()

    if (loading) {
        return (
            <LoaderContainer />
        )
    }
    if (error) {
        return (
            <TextStatus>{error.message}</TextStatus>
        )
    }
    if (!data?.totalCount) {
        return (
            <TextStatus>{t("listEmpty")}</TextStatus>
        )
    }
    return (
        <StyledEventsListModal>
            <H1 style={{ paddingTop: 16, paddingHorizontal: 16 }}>{t("eventsInThisPlace")}</H1>
            <FlatList
                contentContainerStyle={{ paddingBottom: 65, paddingHorizontal: 16 }}
                data={data.paginatedResults}
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
    /* padding: 16px 16px 0 16px; */
    gap: 8px;
`

