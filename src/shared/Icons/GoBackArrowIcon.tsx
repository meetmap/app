import React from 'react'
import Svg, { Path } from 'react-native-svg'

const GoBackArrowIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M15 5l-7 7 7 7"
                stroke="#7A7B84"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default GoBackArrowIcon