import * as React from "react"
import { ActivityIndicator, Image, View } from "react-native"
import Svg, { SvgProps, Path, Rect, Mask } from "react-native-svg"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useState } from "react"

interface IUserPin extends SvgProps {
    profilePicture: string | undefined
}
const UserPin = ({ profilePicture, ...props }: IUserPin) => {
    return (
        <StyledUserPinView>
            <LoadableProfileImage containerSize={36} profilePicture={profilePicture} />
            {/* <Svg
                width={38}
                height={45}
                fill="none"
                {...props}
            >
                <Path
                    fill="#000"
                    d="M28 34.47c-4.835 2.92-6.166 4.175-8.049 8.324-.367.81-1.535.81-1.902 0-1.883-4.15-3.214-5.403-8.049-8.323a24.652 24.652 0 0 0 18 0Z"
                />
                <Rect width={35} height={35} x={1.5} y={1.5} stroke="#000" rx={17.5} />
                <Mask
                    id="a"
                    width={38}
                    height={45}
                    x={0}
                    y={0}
                    fill="#000"
                    maskUnits="userSpaceOnUse"
                >
                    <Path fill="#fff" d="M0 0h38v45H0z" />
                    <Path
                        fillRule="evenodd"
                        d="M26.671 35.288C32.776 32.408 37 26.198 37 19c0-9.941-8.059-18-18-18S1 9.059 1 19c0 7.197 4.224 13.408 10.329 16.288 3.773 2.377 5.022 3.765 6.72 7.506.367.81 1.535.81 1.902 0 1.698-3.741 2.947-5.129 6.72-7.506Z"
                        clipRule="evenodd"
                    />
                </Mask>
                <Path
                    fill="#fff"
                    d="m26.671 35.288-.426-.904-.055.026-.052.032.533.846Zm-15.342 0 .533-.846-.052-.032-.055-.026-.426.904Zm6.72 7.506-.911.413.91-.413Zm1.902 0 .911.413-.91-.413ZM36 19c0 6.796-3.988 12.663-9.755 15.384l.853 1.809C33.54 33.153 38 26.599 38 19h-2ZM19 2c9.389 0 17 7.611 17 17h2C38 8.507 29.493 0 19 0v2ZM2 19C2 9.611 9.611 2 19 2V0C8.507 0 0 8.507 0 19h2Zm9.755 15.384C5.988 31.663 2 25.796 2 19H0c0 7.599 4.46 14.154 10.902 17.193l.853-1.81Zm7.204 7.997c-.866-1.91-1.652-3.297-2.747-4.519-1.09-1.216-2.44-2.216-4.35-3.42l-1.066 1.692c1.862 1.174 3.024 2.056 3.926 3.063.898 1.001 1.585 2.178 2.416 4.01l1.821-.826Zm.082 0a.076.076 0 0 1-.007.012l-.002.001a.067.067 0 0 1-.032.007.067.067 0 0 1-.032-.007h-.002c0-.001 0-.002-.002-.003a.076.076 0 0 1-.005-.01l-1.821.826c.722 1.592 3.002 1.592 3.724 0l-1.821-.826Zm7.097-7.939c-1.91 1.204-3.26 2.204-4.35 3.42-1.095 1.222-1.881 2.61-2.747 4.519l1.821.826c.831-1.832 1.518-3.009 2.416-4.01.902-1.007 2.064-1.89 3.927-3.063l-1.067-1.692Z"
                    mask="url(#a)"
                />
                <Rect width={35} height={35} x={1.5} y={1.5} stroke="#000" rx={17.5} />
            </Svg> */}
        </StyledUserPinView>
    )
}

export default UserPin


const StyledUserPinView = styled(View)`
    border: solid 2px white;
    background-color: black;
    border-radius: 36px;
    padding: 1px;
`
