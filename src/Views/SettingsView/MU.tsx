import Animated, {
    FadeIn,
    FadeOut,
    SlideInDown,
    SlideInLeft,
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
    SlideOutUp,
} from 'react-native-reanimated';
import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMapFiltersState } from '../../store/slices/mapSlice';

function SWMLogo() {

    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters);
    if (mapFiler === 'Friends' || mapFiler === 'All') {
        return (
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Text>
                    SWM
                </Text>
            </Animated.View>
        );
    }
    return
}

export default function MountingUnmounting(): React.ReactElement {

    const mapFilters = ["Friends", "Events", "All"]
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const dispatch = useAppDispatch()
    const changeMapFilters = () => {
        const filterIndex = mapFilters.indexOf(mapFiler)
        if (filterIndex < mapFilters.length - 1) {
            dispatch(setMapFiltersState(mapFilters[filterIndex + 1]))
        } else {
            dispatch(setMapFiltersState(mapFilters[0]))
        }
    }
    
    return (
        <SafeAreaView>
            <View>
                <PrimaryMediumButton
                    title="toggle"
                    onPress={changeMapFilters}
                />
                <SWMLogo />
            </View>
        </SafeAreaView>
    );
}
