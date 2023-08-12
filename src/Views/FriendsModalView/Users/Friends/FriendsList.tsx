import { Dispatch, SetStateAction, useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, ScrollView } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { GetInitialFriendsThunk } from "../../../../store/slices/friendsSlice";
import LoaderContainer from "../../../../shared/LoaderContainer";
import TextStatus from "../../../../shared/TextStatus";
import UserDataInList from "../../../../shared/Profile/UserDataInList";
import { useTranslation } from "react-i18next";

const FriendsList = ({ friendListType, setFriendListType }: { friendListType: string, setFriendListType: Dispatch<SetStateAction<string>> }) => {
    const { t } = useTranslation()
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
        if (incomingRequests.totalCount > 0) {
            setFriendListType("incomingRequests")
        }
    }, [incomingRequests])


    const choosedFriendsData = () => {
        switch (friendListType) {
            case "incomingRequests":
                return incomingRequests
            case "outcomingRequests":
                return outcomingRequests;
            default:
                return friends
        }
    }

    if (isLoading) {
        return <LoaderContainer />
    }
    if (choosedFriendsData().totalCount === 0) {
        return (
            <TextStatus>{t("listEmpty")}</TextStatus>
        )
    }
    return (
        <FlatList
            contentContainerStyle={{ paddingBottom: 25, flex: 1, gap: 12 }}
            data={choosedFriendsData().paginatedResults}
            horizontal={false}
            scrollEnabled
            renderItem={({ item }) => <UserDataInList userData={item} />}
            keyExtractor={item => item.id}
        />
    )
}

export default FriendsList

const StyledUsersList = styled(ScrollView)`
  gap: 9px;
`;