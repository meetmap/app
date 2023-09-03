import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { TextcolorsType } from '../Text'
import { useTheme } from 'styled-components'

const PlusSmIcon = ({ strokeColor = "Black" }: { strokeColor?: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg
            width={14}
            height={14}
            viewBox="0 0 14 14"
            fill="none"
        >
            <Path d="M7 2.917v8.166M2.917 7h8.166" stroke={theme.colors.TEXT[strokeColor]} />
        </Svg>
    )
}

export default PlusSmIcon