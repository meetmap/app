import { TouchableOpacityProps } from "react-native"
import { FriendshipStatusType, IPartialUser } from "../../../types/users"
import React, { useState } from "react"
import { acceptFriendship, rejectFriendship, requestFriendship } from "../../../api/friends"
import PrimarySmallButton from "../PrimarySmallButton"
import PlusSmIcon from "../../Icons/PlusSmIcon"
import ConfirmAlert from "../../Alerts/ConfirmAlert"
import CheckSmIcon from "../../Icons/CheckSmIcon"

interface IFriendRequestButton extends TouchableOpacityProps {
    friendshipStatus: FriendshipStatusType
    userData: IPartialUser
}

const FriendshipStatusButton = ({ friendshipStatus, userData, ...rest }: IFriendRequestButton) => {

    const [localFriendshipStatus, setLocalfriendshipStatus] = useState<FriendshipStatusType>(friendshipStatus)

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

    const [friendsAlertOpened, setfriendsAlertOpened] = useState(false)

    switch (localFriendshipStatus) {
        case "requested":
            return (
                <PrimarySmallButton onPress={HandleRejectRequest} btnType="Secondary" textColor="Primary" {...rest}>
                    Request sent
                </PrimarySmallButton>
            )
        case "pending":
            return (
                <PrimarySmallButton onPress={HandleAcceptRequest} btnType="Secondary" textColor="Primary"  {...rest}>
                    <PlusSmIcon /> Accept request
                </PrimarySmallButton>
            )
        case "rejected":
            return (
                <PrimarySmallButton onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon /> Add friend
                </PrimarySmallButton>
            )
        case "friends":
            return (
                <>
                    {/* <Alert isOpen={friendsAlertOpened} submitFunc={HandleRejectRequest} setIsOpen={setfriendsAlertOpened} alertHeader={"Do you really want to unfriend the person?"} /> */}
                    <PrimarySmallButton onPress={() => ConfirmAlert(HandleRejectRequest, `Do you really want to unfriend ${userData.username}?`, undefined)} btnType="Primary" textColor="White" {...rest}>
                        <CheckSmIcon /> Friends
                    </PrimarySmallButton>
                </>
            )
        default:
            return (
                <PrimarySmallButton onPress={HandleRequestFriendship} btnType="Primary" textColor="White" {...rest}>
                    <PlusSmIcon /> Add friend
                </PrimarySmallButton>
            )
    }
}

export default FriendshipStatusButton