import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { useTheme } from "styled-components"
import { TextcolorsType } from "../Text"
import { IMessageStyleType } from "../Message/NewMessage"

function MessagePinIcon({ messageStyle = "Primary" }: { messageStyle?: IMessageStyleType }) {
    const theme = useTheme()
    return (
        <Svg
            width={5}
            height={13}
            viewBox="0 0 5 13"
            fill="none"
        >
            <Path d="M0 6V0v4.17C0 7.786 1.898 11.138 5 13H0V6z" fill={theme.colors.INPUT[messageStyle].BGColor} />
        </Svg>
    )
}

export default MessagePinIcon