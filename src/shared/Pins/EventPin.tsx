import styled from "styled-components/native";
import { useMap } from "../../hooks/MapProvider";
import { IEvent, IEventByLocation } from "../../types/event";
import { Image, TouchableOpacity, View } from "react-native";
import LoadableImage from "../LoadableImage/LoadableImage";
import { NavigationProps } from "../../types/NavigationProps";
import { useNavigation } from "@react-navigation/native";

const EventPin = ({ eventData }: { eventData: IEventByLocation }) => {
    const navigation = useNavigation<NavigationProps>();
    const { mapViewRef, flyTo } = useMap();
    // const checkEvent = () => {
    //     // flyTo({lat: eventData.coordinates[1], lng: eventData.coordinates[0]})
    //     navigation.navigate("EventModalView", { eventCid: eventData.cid })
    // }
    return (
        <StyledEventPinContent
            // onPress={checkEvent}
        >
            <StyledEventImage height={40} width={40} source={{ uri: eventData.thumbnail || "" }} />
        </StyledEventPinContent>
    )
}

export default EventPin


const StyledEventPinContent = styled(View)`
    background-color: white;
    border-radius: 18px;
    padding: 2px;
    border: solid 1px #6c9fff;

    /* position: relative; */
    `
const StyledEventImage = styled(Image)`
    /* top: -50%; */
    width: 100%;
    width: 52px;
    height: 52px;
    /* position: absolute; */
    border-radius: 16px;
`