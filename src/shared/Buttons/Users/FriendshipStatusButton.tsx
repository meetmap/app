import { TouchableOpacityProps } from "react-native"
import { FriendshipStatusType, IPartialUser } from "@src/types/users"
import React, { useState } from "react"
import { acceptFriendship, rejectFriendship, requestFriendship } from "@src/api/friends"
import PlusSmIcon from "../../Icons/PlusSmIcon"
import ConfirmAlert from "../../Alerts/ConfirmAlert"
import CheckSmIcon from "../../Icons/CheckSmIcon"
import { PrimaryButton } from "../"

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
                <PrimaryButton btnSize="sm" title="Request sent" onPress={HandleRejectRequest} btnType="Secondary" textColor="Primary" {...rest} />
            )
        case "pending":
            return (
                <PrimaryButton btnSize="sm" title="Accept request" onPress={HandleAcceptRequest} btnType="Secondary" textColor="Primary"  {...rest}>
                    <PlusSmIcon />
                </PrimaryButton>
            )
        case "rejected":
            return (
                <PrimaryButton btnSize="sm" title="Add friend" onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon />
                </PrimaryButton>
            )
        case "friends":
            return (
                <PrimaryButton btnSize="sm" title="Friends" onPress={() => ConfirmAlert(HandleRejectRequest, `Do you really want to unfriend ${userData.name || userData.username}?`, undefined)} btnType="Primary" textColor="White" {...rest}>
                    <CheckSmIcon strokeColor="White" />
                </PrimaryButton>
            )
        default:
            return (
                <PrimaryButton btnSize="sm" title="Add friend" onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon strokeColor="White" />
                </PrimaryButton>
            )
    }
}

export default FriendshipStatusButton