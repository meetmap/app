import { useCallback, useEffect, useState } from "react"
import { IEvent } from "../../../types/event"
import { getLikedEvents } from "../../../api/events"
import LoaderContainer from "../../../shared/LoaderContainer"
import TextStatus from "../../../shared/TextStatus"
import EventLg from "../../../shared/EventInList/EventLg"
import styled from "styled-components/native"
import { FlatList, ListRenderItem, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native"
import { useTranslation } from "react-i18next"
import useAxios from "../../../hooks/useAxios"
import { H3 } from "../../../shared/Text"
import { IPaginateRespose } from "../../../types/response"
import useAxiosPaginated from "../../../hooks/useAxiosPaginated"

const LikedEvents = () => {
    const { data: likedEvents, loading, error, refreshing, onRefresh, paginate} = useAxiosPaginated<IEvent>(getLikedEvents)
    const { t } = useTranslation()

    if (loading) {
        return (
            <StyledLikedEventsContainer>
                <LoaderContainer />
            </StyledLikedEventsContainer>
        )
    }

    if (error) {
        return (
            <StyledLikedEventsContainer>
                <TextStatus>{error.message}</TextStatus>
            </StyledLikedEventsContainer>
        )
    }
    if (!likedEvents?.totalCount) {
        return (
            <StyledLikedEventsContainer>
                <TextStatus>{t("youDontHaveLikedEvents")}</TextStatus>
            </StyledLikedEventsContainer>
        )
    }
    return (
        <StyledLikedEventsContainer>
            <FlatList
                onEndReached={paginate}
                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 25 }}
                data={likedEvents.paginatedResults}
                renderItem={({ item }) => <EventLg eventData={item} />}
                keyExtractor={item => item.id}
            />
        </StyledLikedEventsContainer>
    )
}

export default LikedEvents


const StyledLikedEventsContainer = styled(View)`
    background-color: white;
    flex: 1;
`