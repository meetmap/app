import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IEvent } from "../../types/event";
import { useState } from "react";
import LikeButton from "../Buttons/LikeButton";
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
import EventInListActions from "../Actions/Events/EventInListActions";
import { useTranslation } from "react-i18next";
import 'moment/locale/ru'

const EventLg = ({ eventData }: { eventData: IEvent }) => {
    const { userCoordinates } = useAppSelector(state => state.locationSlice)
    const distance = useCalculateDistance(
        eventData.location.coordinates.coordinates[1],
        eventData.location.coordinates.coordinates[0],
        userCoordinates?.lat,
        userCoordinates?.lng
    )
    const { i18n, t } = useTranslation()
    const momentLocaleFormat = {
        en: "MMM D - h A",
        ru: "D MMM - h A"
    }
    const formattedStartTime = moment(eventData.startTime).locale(i18n.language).format(momentLocaleFormat[i18n.language as keyof typeof momentLocaleFormat]);
    const navigation = useNavigation<NavigationProps>();
    const { flyTo } = useMap()

    return (
        <StyledEventLgContainer onPress={() => {
            navigation.popToTop();
            navigation.push("EventModalView", { eventCid: eventData.cid })
        }}>
            <StyledEventLgImageContainer>
                <LoadableImage source={{
                    uri: eventData.thumbnail
                }} />
                <LikeButton eventCid={eventData.cid} isLiked={eventData.userStats.isUserLike} />
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
                        <Span>{distance} {t("fromYou")}</Span>
                    }
                    <Span>{formattedStartTime}</Span>
                </StyledAboutEventTextInfo>
                <StyledEventMoreAction onPress={() => EventInListActions(eventData, flyTo, navigation)}>
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