import { TouchableOpacityProps } from "react-native"
import { FriendshipStatusType, IPartialUser } from "../../../types/users"
import React, { useState } from "react"
import { acceptFriendship, rejectFriendship, requestFriendship } from "../../../api/friends"
import PrimarySmallButton from "../PrimarySmallButton"
import PlusSmIcon from "../../Icons/PlusSmIcon"
import ConfirmAlert from "../../Alerts/ConfirmAlert"
import CheckSmIcon from "../../Icons/CheckSmIcon"

interface IFriendRequestButton extends TouchableOpacityProps {
    userData: IPartialUser
}

const FriendshipStatusButton = ({ userData, ...rest }: IFriendRequestButton) => {

    const [localFriendshipStatus, setLocalfriendshipStatus] = useState<FriendshipStatusType>(userData.friendshipStatus)

    const HandleAcceptRequest = async () => {
        setLocalfriendshipStatus("friends")
        await acceptFriendship(userData.cid)
    }
    const HandleRejectRequest = async () => {
        setLocalfriendshipStatus("add-friend")
        await rejectFriendship(userData.cid)
    }
    const HandleRequestFriendship = async () => {
        setLocalfriendshipStatus("requested")
        await requestFriendship(userData.cid)
    }

    switch (localFriendshipStatus) {
        case "requested":
            return (
                <PrimarySmallButton title="Request sent" onPress={HandleRejectRequest} btnType="Secondary" textColor="Primary" {...rest} />
            )
        case "pending":
            return (
                <PrimarySmallButton title="Accept request" onPress={HandleAcceptRequest} btnType="Secondary" textColor="Primary"  {...rest}>
                    <PlusSmIcon />
                </PrimarySmallButton>
            )
        case "rejected":
            return (
                <PrimarySmallButton title="Add friend" onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon />
                </PrimarySmallButton>
            )
        case "friends":
            return (
                <PrimarySmallButton title="Friends" onPress={() => ConfirmAlert(HandleRejectRequest, `Do you really want to unfriend ${userData.name || userData.username}?`, undefined)} btnType="Primary" textColor="White" {...rest}>
                    <CheckSmIcon strokeColor="White" />
                </PrimarySmallButton>
            )
        default:
            return (
                <PrimarySmallButton title="Add friend" onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon strokeColor="White" />
                </PrimarySmallButton>
            )
    }
}

export default FriendshipStatusButton