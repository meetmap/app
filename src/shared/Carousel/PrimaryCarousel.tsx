import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    Text,
    View,
    ViewToken,
} from 'react-native';
import styled from 'styled-components';


// const { width } = Dimensions.get('window');

// const ITEM_LENGTH = width // Item is a square. Therefore, its height and width are of the same length.


interface ImageCarouselProps {
    data: string[];
    width: number
    height: number
    squared?: boolean
}


const PrimaryCarousel: FC<ImageCarouselProps> = ({ data, width, height, squared = false }) => {
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        const item = viewableItems[0]
        if (item && item.index !== null) {
            setActiveIndex(item.index)
        }
    };

    const viewabilityConfig = { itemVisiblePercentThreshold: 100 };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);

    return (
        <StyledCarouselView squared={squared}>
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ width }}>
                            <Image source={{ uri: item }} style={styles.itemImage} />
                        </View>
                    );
                }}
                horizontal
                bounces={data.length > 1}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item}
                decelerationRate={0}
                renderToHardwareTextureAndroid
                contentContainerStyle={styles.flatListContent}
                snapToInterval={width}
                snapToAlignment="start"
                scrollEventThrottle={16}
                viewabilityConfigCallbackPairs={
                    viewabilityConfigCallbackPairs.current
                }
            />
            {data.length > 1 &&
                <StyledCarouselListIndicator>
                    {data.map((image, index) => (
                        <StyledCarouselListMarker key={index} active={activeIndex === index} />
                    ))}
                </StyledCarouselListIndicator>
            }
        </StyledCarouselView>
    );
};

const StyledCarouselView = styled(View)<{squared: boolean}>`
    align-items: center;
    ${props => props.squared ? "border-radius: 16px;" : ""}
    overflow: hidden;
`
const StyledCarouselListIndicator = styled(View)`
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
const styles = StyleSheet.create({
    container: {},
    flatListContent: {
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
});
export default PrimaryCarousel;
