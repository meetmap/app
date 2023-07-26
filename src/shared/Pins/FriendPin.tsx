import * as React from "react"
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useState } from "react"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"
import { IPartialUser } from "../../types/users"
import { GetFriendsLocationResponse } from "../../api/location"

interface IFriendPin {
    profilePicture: string | undefined
    userData: GetFriendsLocationResponse
}
const FriendPin = ({ userData, profilePicture }: IFriendPin) => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <StyledUserPinView onPress={() => navigation.navigate("ProfileView", { userId: userData.cid, username: userData.username })}>
            <LoadableProfileImage containerSize={40} profilePicture={profilePicture} />
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
