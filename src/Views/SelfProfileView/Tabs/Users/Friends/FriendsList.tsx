import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { GetInitialFriendsThunk } from "../../../../../store/slices/friendsSlice";
import LoaderContainer from "../../../../../shared/LoaderContainer";
import TextStatus from "../../../../../shared/TextStatus";
import UserDataInList from "../../../../../shared/Profile/UserDataInList";
import styled from "styled-components/native";
import { ScrollView } from "react-native";

const FriendsList = ({ friendListType, setFriendListType }: { friendListType: string, setFriendListType: Dispatch<SetStateAction<string>> }) => {

    const {
        friends,
        incomingRequests,
        outcomingRequests,
        isLoading
    } = useAppSelector(state => state.friendsSlice)

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(GetInitialFriendsThunk());
    }, []);

    useEffect(() => {
        if (incomingRequests.length > 0) {
            setFriendListType("Incoming")
        }
    }, [incomingRequests])


    const choosedFriendsData = () => {
        switch (friendListType) {
            case "Incoming":
                return incomingRequests
            case "Outcoming":
                return outcomingRequests;
            default:
                return friends
        }
    }

    if(isLoading){
        return <LoaderContainer/>
    }
    if (choosedFriendsData().length === 0) {
        return (
            <TextStatus>The list is empty</TextStatus>
        )
    }
    return (
        <StyledUsersList>
            {choosedFriendsData().map((friend) => (
                <UserDataInList key={friend.id} userData={friend} />
            ))}
        </StyledUsersList>
    )
}

export default FriendsList

const StyledUsersList = styled(ScrollView)`
  gap: 9px;
`;