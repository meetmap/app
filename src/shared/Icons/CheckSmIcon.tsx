import React from 'react'
import { Path, Svg } from 'react-native-svg'
import { TextcolorsType } from '../Text'
import { useTheme } from 'styled-components'

const CheckSmIcon = ({ strokeColor = "Black" }: { strokeColor?: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg width="14" height="14" viewBox="0 0 14 14" fill="none" >
            <Path
                d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                stroke={theme.colors.TEXT[strokeColor]}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </Svg>
    )
}

export default CheckSmIcon