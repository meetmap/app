import { Image, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import { Span } from "../Text"
import Svg, { SvgProps, Path, Mask, Rect } from "react-native-svg"
import { IEvent } from "../../types/event"
import LoadableImage from "../LoadableImage/LoadableImage"

const ClusterEventPin = ({ eventData, count, coordinates, pictures }: {
    eventData: IEvent,
    count: number,
    coordinates: number[],
    pictures: string[]
}) => {
    return (
        <StyledEventPinContent>
            <StyledEventPinContent>
                <StyledEventImage
                    source={{ uri: eventData.picture }}
                />
                <Svg
                    width={58}
                    height={67}
                    fill="none"
                >
                    <Path
                        fill="#000"
                        d="M39 57c-4.876.333-6.947 3.119-9.051 7.795-.365.81-1.533.81-1.898 0C25.947 60.119 23.876 57.333 19 57h20Z"
                    />
                    <Mask
                        id="a"
                        width={58}
                        height={67}
                        x={0}
                        y={0}
                        fill="#000"
                        maskUnits="userSpaceOnUse"
                    >
                        <Path fill="#fff" d="M0 0h58v67H0z" />
                        <Path d="M19 2h20c9.389 0 17 7.611 17 17v20c0 9.389-7.611 17-17 17H19C9.611 56 2 48.389 2 39V19C2 9.611 9.611 2 19 2ZM1 19C1 9.059 9.059 1 19 1h20c9.941 0 18 8.059 18 18v20c0 9.941-8.059 18-18 18-4.876.333-6.947 3.119-9.051 7.795-.365.81-1.533.81-1.898 0C25.947 60.119 23.876 57.333 19 57 9.059 57 1 48.941 1 39V19Z" />
                    </Mask>
                    <Path
                        fill="#fff"
                        d="M39 57v-1h-.034l-.034.002L39 57Zm-9.051 7.795.911.41-.911-.41Zm-1.898 0-.911.41.911-.41ZM19 57l.068-.998-.034-.002H19v1ZM39 1H19v2h20V1Zm18 18c0-9.941-8.059-18-18-18v2c8.837 0 16 7.163 16 16h2Zm0 20V19h-2v20h2ZM39 57c9.941 0 18-8.059 18-18h-2c0 8.837-7.163 16-16 16v2Zm-20 0h20v-2H19v2ZM1 39c0 9.941 8.059 18 18 18v-2c-8.837 0-16-7.163-16-16H1Zm0-20v20h2V19H1ZM19 1C9.059 1 1 9.059 1 19h2c0-8.837 7.163-16 16-16V1Zm0-1C8.507 0 0 8.507 0 19h2C2 9.611 9.611 2 19 2V0Zm20 0H19v2h20V0Zm19 19C58 8.507 49.493 0 39 0v2c9.389 0 17 7.611 17 17h2Zm0 20V19h-2v20h2ZM39 58c10.493 0 19-8.507 19-19h-2c0 9.389-7.611 17-17 17v2Zm-.068-1.998c-2.644.18-4.608 1.041-6.186 2.542-1.539 1.464-2.648 3.481-3.71 5.84l1.824.821c1.043-2.316 2.022-4.03 3.264-5.212 1.203-1.144 2.711-1.843 4.944-1.995l-.136-1.996Zm-9.895 8.382a.063.063 0 0 1-.007.012.062.062 0 0 1-.03.007.062.062 0 0 1-.03-.007l-.002-.002a.063.063 0 0 1-.005-.01l-1.823.821c.718 1.597 3.002 1.597 3.72 0l-1.823-.82Zm-.074 0c-1.062-2.359-2.17-4.376-3.709-5.84-1.578-1.5-3.543-2.361-6.186-2.542l-.136 1.996c2.233.152 3.741.851 4.944 1.995 1.242 1.182 2.22 2.895 3.264 5.212l1.823-.82ZM0 39c0 10.493 8.507 19 19 19v-2C9.611 56 2 48.389 2 39H0Zm0-20v20h2V19H0Z"
                        mask="url(#a)"
                    />
                    <Rect width={55} height={55} x={1.5} y={1.5} stroke="#000" rx={17.5} />
                </Svg>
            </StyledEventPinContent>
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



const StyledEventsCount = styled(View)`
    position: absolute;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    bottom: 0;
`
const StyledEventsCountSpan = styled(View)`
    background-color: white;
    padding: 6px;
    border-radius: 12px;
`

const StyledEventPinContent = styled(TouchableOpacity)`
    position: relative;
`

const StyledEventImage = styled(Image)`
    position: absolute;
    width: 56px;
    height: 56px;
    object-fit: cover;
    top: 0;
    left: 0;
    border-radius: 18px;
`