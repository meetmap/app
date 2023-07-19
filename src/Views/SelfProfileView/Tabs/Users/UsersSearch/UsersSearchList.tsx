import React from "react"
import LoaderContainer from "../../../../../shared/LoaderContainer"
import TextStatus from "../../../../../shared/TextStatus"
import { IPartialUser } from "../../../../../types/users"
import UserDataInList from "../../../../../shared/Profile/UserDataInList"
import { ScrollView } from "react-native"
import styled from "styled-components/native"

const UsersSearchList = ({ searchUsersData, searchUsersLoading }: { searchUsersData: IPartialUser[] | null, searchUsersLoading: boolean }) => {

    if (searchUsersLoading) {
        return <LoaderContainer />
    }
    if (searchUsersData?.length === 0) {
        return (
            <TextStatus>User not found</TextStatus>
        )
    }
    if (searchUsersData) {
        return (
            <StyledUsersList>
                {
                    searchUsersData.map((friend) => (
                        <UserDataInList key={friend.id} userData={friend} />
                    ))
                }
            </StyledUsersList>
        )
    }
    return null
}

export default UsersSearchList

const StyledUsersList = styled(ScrollView)`
  gap: 9px;
`;
