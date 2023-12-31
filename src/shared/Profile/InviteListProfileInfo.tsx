import React, { useState } from "react"
import { IPartialUser } from "@src/types/users"
import { H6, P, Span } from "../Text"
import styled from "styled-components/native"
import { TouchableOpacity, View } from "react-native"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "@src/types/NavigationProps"
import { useTranslation } from "react-i18next"

export const InviteListProfileInfo = ({ userData }: { userData: IPartialUser }) => {
    const navigation = useNavigation<NavigationProps>();
    const [invited, setInvited] = useState(false) //userInvited
    const { t } = useTranslation()
    const handleInviteUser = () => {
        setInvited(state => !state)
    }
    return (
        <StyledUserDataInList>
            <StyledUserDataInfo onPress={() => navigation.navigate("ProfileView", { userCid: userData.cid })}>
                <LoadableProfileImage profilePicture={userData.profilePicture} containerSize={56} />
                <StyledUserInfo>
                    {userData.name && <H6>{userData.name}</H6>}
                    <Span textcolor='Primary'>@{userData.username}</Span>
                </StyledUserInfo>
            </StyledUserDataInfo>
            <StyledUserActions>
                <TouchableOpacity onPress={handleInviteUser}>
                    <P textcolor="Primary">{invited ? t("invited") : t("invite")}</P>
                </TouchableOpacity>
            </StyledUserActions>
        </StyledUserDataInList>
    )
}


const StyledUserDataInList = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* padding: 6px 0; */
`
const StyledUserDataInfo = styled(TouchableOpacity)`
    flex: 1;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`
const StyledUserInfo = styled(View)`
    flex: 1;
    gap: 4px;
`
const StyledUserActions = styled(View)`
`

