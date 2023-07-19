import { TouchableOpacity, TouchableOpacityProps } from "react-native"
import { FriendshipStatusType } from "../../../types/users"
import SuccessIcon from "../../Icons/SuccessIcon"
import AddUserToFriendsIcon from "../../Icons/AddUserToFriendsIcon"

interface IFriendRequestButton extends TouchableOpacityProps {
    handleChangeFriendshipStatus: () => void
    localFriendshipStatus: FriendshipStatusType
    userCId: string
}

const RequestFriendshipIconButton = ({ handleChangeFriendshipStatus, localFriendshipStatus, userCId, ...rest }: IFriendRequestButton) => {

    if (["add-friend", "rejected", "pending"].includes(localFriendshipStatus)) {
        return (
            <TouchableOpacity onPress={handleChangeFriendshipStatus} {...rest}>
                <AddUserToFriendsIcon />
            </TouchableOpacity>
        )
    }
    if (localFriendshipStatus === "requested") {
        return (
            <TouchableOpacity>
                <SuccessIcon />
            </TouchableOpacity>
        )
    }
    return null

}

export default RequestFriendshipIconButton