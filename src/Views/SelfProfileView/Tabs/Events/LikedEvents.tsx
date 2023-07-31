import { useCallback, useEffect, useState } from "react"
import { IEvent } from "../../../../types/event"
import { getLikedEvents } from "../../../../api/events"
import LoaderContainer from "../../../../shared/LoaderContainer"
import TextStatus from "../../../../shared/TextStatus"
import EventLg from "../../../../shared/EventInList/EventLg"
import styled from "styled-components/native"
import { FlatList, ListRenderItem, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native"
import { useTranslation } from "react-i18next"

const LikedEvents = () => {

    const [likedEvents, setlikedEvents] = useState<IEvent[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchLikedEvents = async () => {
        setIsLoading(true)
        const likedEventsData = await getLikedEvents()
        setIsLoading(false)
        setlikedEvents(likedEventsData)
    }
    useEffect(() => {
        fetchLikedEvents()
    }, [])

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        const likedEventsData = await getLikedEvents()
        setlikedEvents(likedEventsData)
        setRefreshing(false)
    }, []);
    const { t } = useTranslation()
    
    if (isLoading) {
        return (
            <StyledLikedEventsContainer>
                <LoaderContainer />
            </StyledLikedEventsContainer>
        )
    }
    if (!likedEvents?.length) {
        return (
            <StyledLikedEventsContainer>
                <TextStatus>{t("youDontHaveLikedEvents")}</TextStatus>
            </StyledLikedEventsContainer>
        )
    }
    return (
        <StyledLikedEventsContainer>
            <FlatList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{ paddingBottom: 25, backgroundColor: "white" }}
                data={likedEvents}
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
    padding: 0 16px;
`