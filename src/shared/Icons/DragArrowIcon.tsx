import React from 'react'
import Svg, { Path } from 'react-native-svg'

const DragArrowIcon = () => {
    return (
        <Svg
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
        >
            <Path
                d="M11 6.5l-5-5-5 5"
                stroke="#000"
                strokeWidth={1.66667}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default DragArrowIcon