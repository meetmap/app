import { useEffect, useState } from "react"
import { IEvent } from "../../../../types/event"
import { getLikedEvents } from "../../../../api/events"
import LoaderContainer from "../../../../shared/LoaderContainer"
import TextStatus from "../../../../shared/TextStatus"
import EventLg from "../../../../shared/EventInList/EventLg"
import styled from "styled-components/native"
import { FlatList, ListRenderItem, SafeAreaView, ScrollView, Text, View } from "react-native"

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
                <TextStatus>You don't have liked events</TextStatus>
            </StyledLikedEventsContainer>
        )
    }
    return (
        <StyledLikedEventsContainer >
            <FlatList
                contentContainerStyle={{ paddingBottom: 25, backgroundColor: "white" }}
                data={likedEvents}
                horizontal={false}
                scrollEnabled
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
    padding: 16px;
`