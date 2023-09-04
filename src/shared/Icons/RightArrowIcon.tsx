import React from 'react'
import Svg, { Path } from "react-native-svg"

const RightArrowIcon = () => {
    return (
        <Svg
            width={7}
            height={10}
            fill="none"
        >
            <Path
                stroke="#2671FF"
                strokeLinecap="round"
                strokeWidth={1.5}
                d="m1 9 4-4-4-4"
            />
        </Svg>
    )
}

export default RightArrowIcon