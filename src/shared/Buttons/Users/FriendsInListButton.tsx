import { useState } from "react"
import { FriendshipStatusType, IPartialUser } from "../../../types/users"
import MoreIcon from "../../Icons/MoreIcon"
import UserInListActions from "../../Actions/Users/UserInListActions"
import { TouchableOpacity } from "react-native"
import { useMap } from "../../../hooks/MapProvider"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "../../../types/NavigationProps"

const FriendsInListButton = ({ userData, localFriendshipStatus, handleChangeFriendshipStatus }: {
    userData: IPartialUser,
    handleChangeFriendshipStatus: () => Promise<void>
    localFriendshipStatus: FriendshipStatusType
}) => {
    const { mapViewRef, flyTo } = useMap();
    const navigation = useNavigation<NavigationProps>();

    if (localFriendshipStatus === "friends") {
        return (
            <TouchableOpacity onPress={() => UserInListActions(userData, handleChangeFriendshipStatus, flyTo, navigation)}><MoreIcon /></TouchableOpacity>
        )
    }
    return null
}

export default FriendsInListButton