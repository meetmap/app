
import React from 'react'
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"

const ErrorIcon = () => {
    return (
        <Svg
            width={16}
            height={17}
            viewBox="0 0 16 17"
            fill="none"
        >
            <Rect
                y={0.5}
                width={16}
                height={16}
                rx={8}
                fill="url(#paint0_linear_188_565)"
            />
            <Path d="M5.245 12L8 9m2.755-3L8 9m0 0L5 6l6 6" stroke="#fff" />
            <Defs>
                <LinearGradient
                    id="paint0_linear_188_565"
                    x1={8}
                    y1={0.5}
                    x2={8}
                    y2={16.5}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop />
                    <Stop offset={1} />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default ErrorIcon