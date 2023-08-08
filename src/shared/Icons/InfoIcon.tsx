import React from 'react'
import Svg, { Path } from 'react-native-svg'

const InfoIcon = () => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M12 16v-4M12 8h.01"
                stroke="#1A1A1A"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default InfoIcon