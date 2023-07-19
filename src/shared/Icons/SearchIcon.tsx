import React from 'react'
import Svg, { Circle, Path, SvgProps } from 'react-native-svg'
import { TextcolorsType } from '../Text'
import { useTheme } from 'styled-components'

const SearchIcon = ({ strokeColor = "Black" }: { strokeColor?: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg
            width={24}
            height={24}
            fill="none"
        >
            <Circle cx={11} cy={11} r={7} stroke={theme.colors.TEXT[strokeColor]} strokeWidth={2} />
            <Path stroke={theme.colors.TEXT[strokeColor]} strokeLinecap="round" strokeWidth={2} d="m20 20-3-3" />
        </Svg>
    )
}

export default SearchIcon