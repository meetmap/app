import React from 'react'
import Svg, { Path } from 'react-native-svg'

const PlusIcon = ({ fill = "white" }: { fill?: "white" | "black" }) => {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
        >
            <Path
                d="M12 5v14M19 12H5"
                stroke={fill}
                strokeWidth={2}
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default PlusIcon