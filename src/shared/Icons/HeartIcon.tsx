import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const HeartIcon = (props: SvgProps) => {
    return (
        <Svg
            width={20}
            height={20}
            fill="none"
            {...props}
        >
            <Path fill="currentColor" d="m3.709 11.59 5.794 5.443c.2.187.3.281.417.304.053.01.107.01.16 0 .118-.023.218-.117.417-.304l5.794-5.443a4.336 4.336 0 0 0 .457-5.818l-.258-.333c-1.64-2.114-4.932-1.759-6.084.656a.45.45 0 0 1-.812 0C8.442 3.68 5.15 3.325 3.51 5.439l-.258.333a4.336 4.336 0 0 0 .457 5.818Z" />
        </Svg>
    )
}
export default HeartIcon