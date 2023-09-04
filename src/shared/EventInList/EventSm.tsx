import moment from "moment";
import { useAppSelector } from "@src/store/hooks";
import { IEvent } from "@src/types/event";
import { P, Span } from "../Text";
import MoreIcon from "../Icons/MoreIcon";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import { useCalculateDistance } from "@src/hooks/useCalculateDistance";
import LoadableImage from "../LoadableImage/LoadableImage";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "@src/types/NavigationProps";
import { useMap } from "@src/hooks/MapProvider";
import EventInListActions from "../Actions/Events/EventInListActions";
import { useTranslation } from "react-i18next";
import 'moment/locale/ru'
import FastImage from "react-native-fast-image";

const EventSm = ({ eventData }: { eventData: IEvent }) => {
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
        <StyledEventSmContainer onPress={() => navigation.navigate("EventModalView", { eventCid: eventData.cid })}>
            <StyledEventSmImageContainer>
                <LoadableImage style={{borderRadius: 20}} source={{
                    uri: eventData.thumbnail,
                    priority: FastImage.priority.normal,
                }} />
            </StyledEventSmImageContainer>
            <StyledAboutEventContainer>
                <StyledAboutEventTextInfo>
                    <P numberOfLines={1} style={{ flexWrap: "wrap" }}>
                        {eventData.title}
                    </P>
                    {distance &&
                        <Span>{distance} {t("fromYou")}</Span>
                    }
                    <Span>{formattedStartTime}</Span>
                </StyledAboutEventTextInfo>
                <StyledEventMoreAction onPress={() => EventInListActions(eventData, flyTo, navigation)}>
                    <MoreIcon />
                </StyledEventMoreAction>
            </StyledAboutEventContainer>
        </StyledEventSmContainer >
    )
}

export default EventSm

const StyledEventSmContainer = styled(TouchableOpacity)`
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    gap: 8px;
    width: 180px;
`
const StyledEventSmImageContainer = styled(View)`
    position: relative;
    height: 150px;
`
const StyledAboutEventContainer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    gap: 8px;
`
const StyledAboutEventTextInfo = styled(View)`
    gap: 2px;
    flex: 1;
`


const StyledEventMoreAction = styled(TouchableOpacity)`
`