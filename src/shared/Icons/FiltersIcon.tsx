import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const FiltersIcon = (props: SvgProps) => (
    <Svg
        width={22}
        height={22}
        fill="none"
        {...props}
    >
        <Path
            stroke="#1A1A1A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.167 2.75H1.833l7.334 8.672v5.995l3.666 1.833v-7.828l7.334-8.672Z"
        />
    </Svg>
)
export default FiltersIcon
