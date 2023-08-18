import { Image, Text, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import { H6, Span } from "../Text"
import { IEvent, IEventByLocation } from "../../types/event"
import { useMap } from "../../hooks/MapProvider"
import { Camera } from "react-native-maps"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"

const ClusterEventPin = ({ eventData, count, coordinates, cids }: {
    eventData: IEventByLocation,
    count: number,
    coordinates: number[],
    cids: string[]
}) => {
    // const { getCamera, onZoomInPress } = useMap()

    const navigation = useNavigation<NavigationProps>();

    // const handlePressOnEventCluster = async () => {
    //     navigation.navigate("EventsListModalView", { eventCids: cids })
    // }
    return (
        <StyledEventPinContent
            // onPress={handlePressOnEventCluster}
        >
            <StyledEventImage
                source={{ uri: eventData.thumbnail }}
            />
            <StyledEventsCount>
                <StyledEventsCountSpan>
                    <Text style={{fontWeight: "700", fontSize: 11}}>
                        {count}
                    </Text>
                </StyledEventsCountSpan>
            </StyledEventsCount>
        </StyledEventPinContent>

    )
}

export default ClusterEventPin




const StyledEventPinContent = styled(View)`
    background-color: white;
    position: relative;
    border-radius: 18px;
    padding: 1px;
    border: solid 1px black;
`

const StyledEventsCount = styled(View)`
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: -8px;
`
const StyledEventsCountSpan = styled(View)`
        background-color: white;
        padding: 4px 6px;
        border-radius: 12px;
    `
const StyledEventImage = styled(Image)`
    width: 52px;
    height: 52px;
    object-fit: cover;
    top: 0;
    left: 0;
    border-radius: 17px;
`