import React from "react"
import { IPartialUser } from "../../types/users"
import { H6, Span } from "../Text"
import RequestFriendshipIconButton from "../Buttons/Users/RequestFriendshipIconButton"
import FriendsInListButton from "../Buttons/Users/FriendsInListButton"
import styled from "styled-components/native"
import { Image, TouchableOpacity, View } from "react-native"
import useFriendship from "../../hooks/useFriendship"

const UserDataInList = ({ userData, profile = false }: { userData: IPartialUser, profile?: boolean }) => {
    // const [localFriendshipStatus, setLocalFriendshipStatus] = useState(userData.friendshipStatus)
    const { handleChangeFriendshipStatus, localFriendshipStatus } = useFriendship(userData.friendshipStatus, userData.cid)
    return (
        <StyledUserDataInList>
            <StyledUserDataInfo>
                <StyledUserImg source={{ uri: userData.profilePicture }} />
                <StyledUserInfo>
                    <H6>{userData.name}</H6>
                    <Span textcolor='Primary'>@{userData.username}</Span>
                    {!profile && <Span>{userData.description}</Span>}
                </StyledUserInfo>
            </StyledUserDataInfo>
            <StyledUserActions>
                {/* <MoreIcon /> */}
                <RequestFriendshipIconButton
                    handleChangeFriendshipStatus={handleChangeFriendshipStatus}
                    localFriendshipStatus={localFriendshipStatus}
                    userCId={userData.cid}
                />
                <FriendsInListButton
                    handleChangeFriendshipStatus={handleChangeFriendshipStatus}
                    localFriendshipStatus={localFriendshipStatus}
                    userData={userData}
                />
            </StyledUserActions>
        </StyledUserDataInList>
    )
}

export default UserDataInList

const StyledUserDataInList = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledUserDataInfo = styled(TouchableOpacity)`
    flex: 1;
    display: flex;
    gap: 10px;
    align-items: center;
`
const StyledUserImg = styled(Image)`
    height: 56px;
    width: 56px;
    border-radius: 50%;
`
const StyledUserInfo = styled(View)`
    flex: 1;
`
const StyledUserActions = styled(View)`
    height: 56px;
    width: 56px;
    border-radius: 50%;
`

