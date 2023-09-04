import { FriendshipStatusType, IPartialUser } from "@src/types/users"
import MoreIcon from "../../Icons/MoreIcon"
import UserInListActions from "../../Actions/Users/UserInListActions"
import { TouchableOpacity } from "react-native"
import { useMap } from "@src/hooks/MapProvider"
import { useNavigation } from "@react-navigation/native"
import { NavigationProps } from "@src/types/NavigationProps"

const FriendsInListButton = ({ userData, localFriendshipStatus, handleChangeFriendshipStatus }: {
    userData: IPartialUser,
    handleChangeFriendshipStatus: () => Promise<void>
    localFriendshipStatus: FriendshipStatusType
}) => {
    const { flyTo } = useMap();
    const navigation = useNavigation<NavigationProps>();

    if (localFriendshipStatus === "friends") {
        return (
            <TouchableOpacity onPress={() => UserInListActions(userData, handleChangeFriendshipStatus, flyTo, navigation)}><MoreIcon /></TouchableOpacity>
        )
    }
    return null
}

export default FriendsInListButton