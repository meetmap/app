import * as React from "react"
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native"
import styled from "styled-components"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useState } from "react"
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"
import { IPartialUser } from "../../types/users"
import { GetFriendsLocationResponse } from "../../api/location"
import { getTimeDifference } from "../../hooks/getTimeDifference"
import { useTranslation } from "react-i18next"

interface IFriendPin {
    profilePicture: string | undefined
    userData: GetFriendsLocationResponse
}
const FriendPin = ({ userData, profilePicture }: IFriendPin) => {
    const navigation = useNavigation<NavigationProps>();
    const timeDifference = getTimeDifference(userData.locationUpdatedAt)
    const { t } = useTranslation()
    return (
        <StyledUserPinViewWrapper>
            <StyledUserPinView timeDifference={timeDifference} onPress={() => navigation.navigate("ProfileView", { userId: userData.cid, username: userData.username })}>
                <LoadableProfileImage containerSize={44} profilePicture={profilePicture} />
                <StyledLocationUpdateTime>
                    <StyledLocationUpdateTimeText numberOfLines={1} ellipsizeMode={"clip"} timeDifference={timeDifference}>
                        {timeDifference ? timeDifference : t("now")}
                    </StyledLocationUpdateTimeText>
                </StyledLocationUpdateTime>
            </StyledUserPinView>
        </StyledUserPinViewWrapper>
    )
}

export default FriendPin


const StyledUserPinViewWrapper = styled(View)`
    width: 150px;
    height: 150px;
    align-items: center;
    justify-content: center;
`
const StyledUserPinView = styled(TouchableOpacity) <{ timeDifference: string | null }>`
    border: solid 2px ${props => props.timeDifference ? "white" : "#67CE67"};
    background-color: ${props => props.timeDifference ? "black" : "white"};
    border-radius: 36px;
    padding: 1px;
`
const StyledLocationUpdateTime = styled(View)`
    padding: 4px 6px;
    border-radius: 12px;
    background-color: white;
    align-items: baseline;
    position: absolute;
    left: 28px;
    top: -10px;
`
const StyledLocationUpdateTimeText = styled(Text) <{ timeDifference: string | null }>`
    color: ${props => props.timeDifference ? "#9B9B9B" : "#67CE67"};
    font-size: 12px;
    font-weight: 700;
    line-height: 12px;
    letter-spacing: -0.48px;
    max-width: 200px;
`
