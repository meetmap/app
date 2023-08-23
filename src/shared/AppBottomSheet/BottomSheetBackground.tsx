import React, { useMemo } from "react";
import { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const BottomSheetBackground = ({ animatedIndex, style,  }: BottomSheetBackgroundProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        borderTopLeftRadius: interpolate(
            animatedIndex.value,
            [0, 2],
            [36, 0],
            Extrapolate.CLAMP
        ),
        borderTopRightRadius: interpolate(
            animatedIndex.value,
            [0, 2],
            [36, 0],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#fffffffd",
            },
            containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return <Animated.View style={containerStyle} />;
};

export default BottomSheetBackground;