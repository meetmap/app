import React from 'react'
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
import { useTheme } from 'styled-components'
import { TextcolorsType } from '../Text'

const Filters2Icon = ({ strokeColor }: { strokeColor: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg
            width={14}
            height={15}
            viewBox="0 0 14 15"
            fill="none"
        >
            <G
                clipPath="url(#clip0_2_1187)"
                stroke={theme.colors.TEXT[strokeColor]}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <Path d="M2.333 12.75V8.667M2.333 6.333V2.25M7 12.75V7.5M7 5.167V2.25M11.667 12.75V9.833M11.667 7.5V2.25M.583 8.667h3.5M5.25 5.167h3.5M9.917 9.833h3.5" />
            </G>
            <Defs>
                <ClipPath id="clip0_2_1187">
                    <Path fill="#fff" transform="translate(0 .5)" d="M0 0H14V14H0z" />
                </ClipPath>
            </Defs>
        </Svg>
    )
}

export default Filters2Icon