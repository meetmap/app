import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { IEvent } from '../../types/event'
import { FlatList, RefreshControl } from 'react-native'
import { AxiosError } from 'axios'
import TextStatus from '../../shared/TextStatus'
import { useTranslation } from 'react-i18next'
import EventLg from '../../shared/EventInList/EventLg'
import LoaderContainer from '../../shared/LoaderContainer'
import { searchEvents } from '../../api/events'
import { IPaginateRespose } from '../../types/response'
import { useAppSelector } from '../../store/hooks'

const SearchEventsDataList = ({ searchEventsData, isSearchLoading, searchError, paginate }: { searchEventsData: IPaginateRespose<IEvent> | null, isSearchLoading: boolean, searchError: AxiosError | null, paginate: () => Promise<void> }) => {
    const { t } = useTranslation()
    // const [refreshing, setRefreshing] = useState(false);
    // const filters = useAppSelector(state => state.filtersSlice.filters)

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
    if (searchEventsData && searchEventsData.totalCount > 0) {
        return (
            <FlatList
                onEndReached={paginate}
                // ListFooterComponent={<LoaderContainer />}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ paddingBottom: 25 }}
                data={searchEventsData.paginatedResults}
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