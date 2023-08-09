import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { TextcolorsType } from "../Text"
import { useTheme } from "styled-components"

const FiltersIcon = ({ strokeColor = "Black" }: { strokeColor?: TextcolorsType }) => {
    const theme = useTheme()
    return (
        <Svg
            width={22}
            height={22}
            fill="none"
        >
            <Path
                stroke={theme.colors.TEXT[strokeColor]}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.167 2.75H1.833l7.334 8.672v5.995l3.666 1.833v-7.828l7.334-8.672Z"
            />
        </Svg>
    )
}
export default FiltersIcon
