import { useEffect, useState } from "react"
import { IEvent } from "../../../../types/event"
import { getLikedEvents } from "../../../../api/events"
import LoaderContainer from "../../../../shared/LoaderContainer"
import TextStatus from "../../../../shared/TextStatus"
import EventLg from "../../../../shared/EventInList/EventLg"
import styled from "styled-components/native"
import { ScrollView, View } from "react-native"

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
        return <LoaderContainer />
    }
    if (!likedEvents?.length) {
        return  <TextStatus>You don't have liked events</TextStatus>
    }
    return (
        <StyledLikedEventsList>
            {likedEvents.map(event => (
                <EventLg eventData={event} />
            ))}
        </StyledLikedEventsList>
    )
}

export default LikedEvents


const StyledLikedEventsList = styled(ScrollView)`
    display: flex;
    flex-direction: column;
    gap: 12px;
`