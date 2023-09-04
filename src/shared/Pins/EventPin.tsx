import styled from "styled-components/native";
import { IEventByLocation } from "@src/types/event";
import { Image, View } from "react-native";

const EventPin = ({ eventData }: { eventData: IEventByLocation }) => {
    return (
        <StyledEventPinContent
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
    `
const StyledEventImage = styled(Image)`
    width: 100%;
    width: 52px;
    height: 52px;
    border-radius: 16px;
`