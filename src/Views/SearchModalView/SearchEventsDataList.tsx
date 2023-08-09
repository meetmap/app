import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { IEvent } from '../../types/event'
import { FlatList, RefreshControl } from 'react-native'
import { AxiosError } from 'axios'
import TextStatus from '../../shared/TextStatus'
import { useTranslation } from 'react-i18next'
import EventLg from '../../shared/EventInList/EventLg'
import LoaderContainer from '../../shared/LoaderContainer'
import { searchEvents } from '../../api/events'

const SearchEventsDataList = ({ searchEventsData, isSearchLoading, searchError, setSearchEventsData, searchInputData }: { searchEventsData: IEvent[] | null, isSearchLoading: boolean, searchError: AxiosError | null, setSearchEventsData: Dispatch<SetStateAction<IEvent[] | null>>, searchInputData: string | null }) => {
    const { t } = useTranslation()
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        if (searchInputData) {
            const events = await searchEvents(searchInputData)
            setSearchEventsData(events)
        }
        setRefreshing(false)
    }, []);
    if (isSearchLoading) {
        return (
            <LoaderContainer />
        )
    }
    if (searchError) {
        return (
            <TextStatus>
                {searchError.message}
            </TextStatus>
        )
    }
    if (searchEventsData && searchEventsData.length > 0) {
        return (
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ paddingBottom: 25 }}
                data={searchEventsData}
                horizontal={false}
                scrollEnabled
                renderItem={({ item }) => <EventLg eventData={item} />}
                keyExtractor={item => item.id}
            />
        )
    }
    return (
        <TextStatus>{t("eventsNotFound")}</TextStatus>
    )
}

export default SearchEventsDataList