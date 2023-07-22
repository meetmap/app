import React from "react"
import { IPartialUser } from "../../types/users"
import { H6, Span } from "../Text"
import RequestFriendshipIconButton from "../Buttons/Users/RequestFriendshipIconButton"
import FriendsInListButton from "../Buttons/Users/FriendsInListButton"
import styled from "styled-components/native"
import { Image, TouchableOpacity, View } from "react-native"
import useFriendship from "../../hooks/useFriendship"
import LoadableProfileImage from "../LoadableImage/LoadableProfileImage"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../types/NavigationProps"

const UserDataInList = ({ userData, profile = false }: { userData: IPartialUser, profile?: boolean }) => {
    // const [localFriendshipStatus, setLocalFriendshipStatus] = useState(userData.friendshipStatus)
    const { handleChangeFriendshipStatus, localFriendshipStatus } = useFriendship(userData.friendshipStatus, userData.cid)
    const navigation = useNavigation<NavigationProps>();
    return (
        <StyledUserDataInList>
            <StyledUserDataInfo onPress={() => navigation.navigate("ProfileView", { userId: userData.cid, username: userData.username })}>
                <LoadableProfileImage profilePicture={userData.profilePicture} containerSize={56} />
                <StyledUserInfo>
                    {userData.name && <H6>{userData.name}</H6>}
                    <Span textcolor='Primary'>@{userData.username}</Span>
                    {/* {!profile && <Span>{userData.description}</Span>} */}
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
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
`
const StyledUserActions = styled(View)`
`

