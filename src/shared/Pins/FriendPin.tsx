import * as React from "react"
import { ActivityIndicator, Image, View } from "react-native"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useState } from "react"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"

interface IFriendPin {
    profilePicture: string | undefined
    userId: string
}
const FriendPin = ({ userId, profilePicture }: IFriendPin) => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <StyledUserPinView onPress={() => navigation.navigate("ProfileView", { userId })}>
            <LoadableProfileImage containerSize={36} profilePicture={profilePicture} />
        </StyledUserPinView>
    )
}

export default FriendPin


const StyledUserPinView = styled(TouchableOpacity)`
    border: solid 2px white;
    background-color: black;
    border-radius: 36px;
    padding: 1px;
`
