import { useState } from "react"
import { FriendshipStatusType, IPartialUser } from "../../../types/users"
import MoreIcon from "../../Icons/MoreIcon"
import UserInListActions from "../../Actions/Users/UserInListActions"
import { TouchableOpacity } from "react-native"

const FriendsInListButton = ({ userData, localFriendshipStatus, handleChangeFriendshipStatus }: {
    userData: IPartialUser,
    handleChangeFriendshipStatus: () => void
    localFriendshipStatus: FriendshipStatusType
}) => {
    const [actionsOpened, setActionsOpened] = useState(false)

    if (localFriendshipStatus === "friends") {
        return (
            <TouchableOpacity onPress={() => UserInListActions(userData)}><MoreIcon /></TouchableOpacity>
        )
    }
    return null
}

export default FriendsInListButton