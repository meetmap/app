const FriendsInListButton = ({ userData, localFriendshipStatus, handleChangeFriendshipStatus }: {
    userData: IPartialUser,
    handleChangeFriendshipStatus: () => void
    localFriendshipStatus: FriendshipStatusType
}) => {
    const [actionsOpened, setActionsOpened] = useState(false)

    if (localFriendshipStatus === "friends") {
        return (
            <>
                <button onClick={() => setActionsOpened(true)}><MoreIcon /></button>
                <UserInListActions
                    isOpen={actionsOpened}
                    setIsOpen={setActionsOpened}
                    userData={userData}
                    handleChangeFriendshipStatus={handleChangeFriendshipStatus}
                />
            </>
        )
    }
    return null
}

export default FriendsInListButton