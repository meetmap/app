import React, { useState } from 'react'
import { FriendshipStatusType } from '../types/users'
import { acceptFriendship, rejectFriendship, requestFriendship } from '../api/friends'

const useFriendship = ( friendshipStatus: FriendshipStatusType, userCid: string) => {

    const [localFriendshipStatus, setLocalFriendshipStatus] = useState(friendshipStatus)

    const handleChangeFriendshipStatus = async () => {
        if (localFriendshipStatus === "friends" ) {
            setLocalFriendshipStatus("pending")
            await rejectFriendship(userCid)
            return
        } 
        if (localFriendshipStatus === "requested") {
            setLocalFriendshipStatus("add-friend")
            await rejectFriendship(userCid)
            return
        } 
        if (localFriendshipStatus === "add-friend" || localFriendshipStatus === "rejected") {
            setLocalFriendshipStatus("requested")
            await requestFriendship(userCid)
            return
        } 
        //initial pending
        await acceptFriendship(userCid)
        setLocalFriendshipStatus("friends")
        return
    }

    return {
        handleChangeFriendshipStatus,
        localFriendshipStatus
    }
}

export default useFriendship