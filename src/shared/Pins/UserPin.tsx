import * as React from "react"
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native"
import Svg, { SvgProps, Path, Rect, Mask } from "react-native-svg"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"

interface IUserPin extends SvgProps {
    profilePicture: string | undefined
}
const UserPin = ({ profilePicture, ...props }: IUserPin) => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <StyledUserPinView onPress={() => navigation.navigate("SelfProfileView")}>
            <LoadableProfileImage containerSize={40} profilePicture={profilePicture} />
        </StyledUserPinView>
    )
}

export default UserPin


const StyledUserPinView = styled(TouchableOpacity)`
    border: solid 2px white;
    background-color: black;
    border-radius: 36px;
    padding: 1px;

`
