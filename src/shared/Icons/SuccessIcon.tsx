import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { TextcolorsType } from '../Text'
import { useTheme } from 'styled-components'

const SuccessIcon = ({ strokeColor = "Black" }: { strokeColor?: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
            <Path d="M20 6L9 17L4 12" stroke={theme.colors.TEXT[strokeColor]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
    )
}

export default SuccessIcon