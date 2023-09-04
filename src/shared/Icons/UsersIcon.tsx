import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const UsersIcon = () => {
    return (
        <Svg
            width={22}
            height={22}
            fill="none"
        >
            <G
                stroke="#1A1A1A"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                clipPath="url(#a)"
            >
                <Path d="M15.583 19.25v-1.833a3.667 3.667 0 0 0-3.666-3.667H4.583a3.667 3.667 0 0 0-3.666 3.667v1.833M8.25 10.083a3.667 3.667 0 1 0 0-7.333 3.667 3.667 0 0 0 0 7.333ZM21.083 19.25v-1.833a3.668 3.668 0 0 0-2.75-3.548M14.667 2.87a3.667 3.667 0 0 1 0 7.103" />
            </G>
            <Defs>
                <ClipPath id="a">
                    <Path fill="#fff" d="M0 0h22v22H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default UsersIcon