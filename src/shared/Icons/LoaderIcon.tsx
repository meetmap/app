import * as React from "react"
import { useEffect } from "react";
import Animated, { Easing, cancelAnimation, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Svg, {
    SvgProps,
    Path,
    Defs,
    LinearGradient,
    Stop,
    ClipPath,
    G,
} from "react-native-svg"

const LoaderIcon = (props: SvgProps) => {
    const rotation = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    rotateZ: `${rotation.value}deg`,
                },
            ],
        };
    }, [rotation.value]);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, {
                duration: 1000,
                easing: Easing.linear,
            }),
            200
        );
        return () => cancelAnimation(rotation);
    }, []);

    return (
        <Animated.View style={[animatedStyles]}>
            <Svg
                width={64}
                height={64}
                fill="none"
                {...props}
            >
                <G strokeWidth={3} clipPath="url(#a)">
                    <Path
                        stroke="#fff"
                        d="M62.5 32a30.5 30.5 0 1 1-60.998 0A30.5 30.5 0 0 1 62.5 32Z"
                    />
                    <Path stroke="url(#b)" d="M32 62.5A30.5 30.5 0 1 1 62.5 32" />
                </G>
                <Defs>
                    <LinearGradient
                        id="b"
                        x1={0}
                        x2={64}
                        y1={32}
                        y2={32}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#66ACFF" />
                        <Stop offset={0.479} stopColor="#1A40FF" />
                        <Stop offset={1} stopColor="#1E1AFF" />
                    </LinearGradient>
                    <ClipPath id="a">
                        <Path fill="#fff" d="M0 0h64v64H0z" />
                    </ClipPath>
                </Defs>
            </Svg>
        </Animated.View>
    )
}

export default LoaderIcon
