import moment from "moment";
import { useAppDispatch } from "../../store/hooks";
import { IEvent } from "../../types/event";
import { useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import { getEventByIdThunk } from "../../store/slices/eventModalSlice";
import { H6, Span } from "../Text";
import MoreIcon from "../Icons/MoreIcon";
import OpenEventActions from "../Actions/Events/OpenEventActions";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

const EventLg = ({ eventData }: { eventData: IEvent }) => {
    // const distance = useCalculateDistance(
    //     eventData.location.coordinates.coordinates[0],
    //     eventData.location.coordinates.coordinates[1],
    //     35.064,
    //     32.9278599
    // )
    const formattedStartTime = moment(eventData.startTime).format('MMM D - h A');
    const dispatch = useAppDispatch()
    return (
        <StyledEventLgContainer>
            <StyledEventLgImageContainer>
                <img src={eventData.picture} />
                <LikeButton eventId={eventData.id} isLiked={eventData.userStats.isUserLike} />
            </StyledEventLgImageContainer>
            <StyledAboutEventContainer>
                <StyledAboutEventTextInfo onPress={() => console.warn('need to add modal')}>
                    <H6>
                        {eventData.title}
                        {eventData.eventType === "organizer-event" &&
                            <>
                                {" by"} <Span textcolor="Primary"> GIPSY</Span>
                            </>
                        }
                    </H6>
                    {/* <Span>{distance} away from you</Span> */}
                    <Span>{formattedStartTime}</Span>
                </StyledAboutEventTextInfo>
                <StyledEventMoreAction onPress={() => OpenEventActions(eventData)}>
                    <MoreIcon />
                </StyledEventMoreAction>
            </StyledAboutEventContainer>
            {/* <EventActions eventData={eventData} isOpen={actionsOpened} setIsOpen={setActionsOpened} title={eventData.title}/> */}
        </StyledEventLgContainer >
    )
}

export default EventLg

const StyledEventLgContainer = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: stretch;
`
const StyledEventLgImageContainer = styled(View)`
    position: relative;
    img{
        width: 100%;
        height: 270px;
        object-fit: cover;
        border-radius: 12px;
    }
`
const StyledAboutEventContainer = styled(View)`
    display: flex;
    justify-content: space-between;
`
const StyledAboutEventTextInfo = styled(TouchableOpacity)`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
`


const StyledEventMoreAction = styled(TouchableOpacity)`
`