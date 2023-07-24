import { Image, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import { Span } from "../Text"
import { IEvent, IEventByLocation } from "../../types/event"
import { useMap } from "../../hooks/MapProvider"
import { Camera } from "react-native-maps"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"

const ClusterEventPin = ({ eventData, count, coordinates, ids }: {
    eventData: IEventByLocation,
    count: number,
    coordinates: number[],
    ids: string[]
}) => {
    // const { getCamera, onZoomInPress } = useMap()

    const navigation = useNavigation<NavigationProps>();

    const handlePressOnEventCluster = async () => {
        // const camera = await getCamera()
        // if (!camera?.altitude || !camera) return

        // if (camera.altitude > 400) {
        //     onZoomInPress({ lat: coordinates[1], lng: coordinates[0] })
        //     return
        // }
        navigation.navigate("EventsListModalView", { eventIds: ids })

    }
    return (
        <StyledEventPinContent
            onPress={handlePressOnEventCluster}
        >
            <StyledEventImage
                source={{ uri: eventData.picture }}
            />
            <StyledEventsCount>
                <StyledEventsCountSpan>
                    <Span>
                        {count}
                    </Span>
                </StyledEventsCountSpan>
            </StyledEventsCount>
        </StyledEventPinContent>

    )
}

export default ClusterEventPin




const StyledEventPinContent = styled(TouchableOpacity)`
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
    width: 56px;
    height: 56px;
    object-fit: cover;
    top: 0;
    left: 0;
    border-radius: 17px;
`