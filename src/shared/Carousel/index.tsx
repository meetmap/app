import React, { useState } from 'react'
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { styled } from 'styled-components';

const EventCarousel = ({ eventsImagesList }: { eventsImagesList: string[] }) => {
    const width = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <View style={{ alignItems: "center" }}>
            <Carousel
                // style={{ height: 250 }}
                // vertical={false}
                width={width}
                // enabled={eventsImagesList.length > 1}
                // height={width / 2}
                data={eventsImagesList}
                // scrollAnimationDuration={1000}
                onSnapToItem={(index) => setActiveIndex(index)}
                // panGestureHandlerProps={{
                //     activeOffsetX: [-10, 10],
                // }}
                loop={false}
                renderItem={(value) => (
                    <Image height={250} width={width} source={{ uri: value.item }} />
                )}
            />
            {eventsImagesList.length > 1 &&
                <StyledCarouselListMarkers>
                    {eventsImagesList.map((image, index) => (
                        <StyledCarouselListMarker key={index} active={activeIndex === index} />
                    ))}
                </StyledCarouselListMarkers>
            }
        </View>
    )
}

export default EventCarousel

const StyledCarouselListMarkers = styled(View)`
    background-color: rgba(118, 128, 148, 0.351);
    border-radius: 30px;
    padding: 6px 12px;
    flex-direction: row;
    gap: 4px;
    position: absolute;
    bottom: 10px;
`
const StyledCarouselListMarker = styled(View) <{ active: boolean }>`
    width: 4px;
    height: 4px;
    background-color: ${props => props.active ? "#ffffff" : "rgba(230, 230, 230, 0.596)"};
    border-radius: 4px;
    /* background-color: #D9D9D9; */
`