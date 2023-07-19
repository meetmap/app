import * as React from "react"
import Svg, {
    SvgProps,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg"

const LoaderIcon = (props: SvgProps) => (
    <Svg
        width={64}
        height={64}
        fill="none"
        {...props}
    >
        <Path
            stroke="#fff"
            d="M62.5 32a30.5 30.5 0 1 1-60.998 0A30.5 30.5 0 0 1 62.5 32Z"
        />
        <Path stroke="url(#a)" d="M32 62.5A30.5 30.5 0 1 1 62.5 32" />
        <Defs>
            <LinearGradient
                id="a"
                x1={0}
                x2={64}
                y1={32}
                y2={32}
                gradientUnits="userSpaceOnUse"
            >
                <Stop />
                <Stop offset={0.479} />
                <Stop offset={1} />
            </LinearGradient>
        </Defs>
    </Svg>
)
export default LoaderIcon
