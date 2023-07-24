import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IEvent } from "../../types/event";
import { useState } from "react";
import LikeButton from "../Buttons/LikeButton";
import { getEventByIdThunk } from "../../store/slices/eventModalSlice";
import { H6, Span } from "../Text";
import MoreIcon from "../Icons/MoreIcon";
import OpenEventActions from "../Actions/Events/OpenEventActions";
import styled from "styled-components/native";
import { Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { useCalculateDistance } from "../../hooks/useCalculateDistance";
import LoadableImage from "../LoadableImage/LoadableImage";
import { useNavigation } from "@react-navigation/native";
import { IMainViewProps } from "../../Views/WelcomeView";
import { NavigationProps } from "../../types/NavigationProps";
import { useMap } from "../../hooks/MapProvider";

const EventLg = ({ eventData }: { eventData: IEvent }) => {
    const { userCoordinates } = useAppSelector(state => state.locationSlice)
    const distance = useCalculateDistance(
        eventData.location.coordinates.coordinates[1],
        eventData.location.coordinates.coordinates[0],
        userCoordinates?.lat,
        userCoordinates?.lng
    )
    const formattedStartTime = moment(eventData.startTime).format('MMM D - h A');
    const navigation = useNavigation<NavigationProps>();
    const { mapViewRef } = useMap()

    return (
        <StyledEventLgContainer onPress={() => navigation.navigate("EventModalView", { eventId: eventData.id })}>
            <StyledEventLgImageContainer>
                <LoadableImage source={{
                    uri: eventData.picture
                }} />
                <LikeButton eventId={eventData.id} isLiked={eventData.userStats.isUserLike} />
            </StyledEventLgImageContainer>
            <StyledAboutEventContainer>
                <StyledAboutEventTextInfo>
                    <H6 style={{ flexWrap: "wrap" }}>
                        {eventData.title}
                        {eventData.eventType === "organizer-event" &&
                            <>
                                {" by"} <Span textcolor="Primary"> GIPSY</Span>
                            </>
                        }
                    </H6>
                    {distance &&
                        <Span> {distance} away from you</Span>
                    }
                    <Span>{formattedStartTime}</Span>
                </StyledAboutEventTextInfo>
                <StyledEventMoreAction onPress={() => OpenEventActions(eventData, mapViewRef, navigation)}>
                    <MoreIcon />
                </StyledEventMoreAction>
            </StyledAboutEventContainer>
        </StyledEventLgContainer >
    )
}

export default EventLg

const StyledEventLgContainer = styled(TouchableOpacity)`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    align-items: stretch;
`
const StyledEventLgImageContainer = styled(View)`
    position: relative;
    height: 270px;
`
const StyledAboutEventContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
const StyledAboutEventTextInfo = styled(View)`
    padding-top: 8px;
    gap: 2px;
    flex: 1;
`


const StyledEventMoreAction = styled(TouchableOpacity)`
`