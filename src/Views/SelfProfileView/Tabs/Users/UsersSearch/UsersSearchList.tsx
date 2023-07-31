import React from "react"
import LoaderContainer from "../../../../../shared/LoaderContainer"
import TextStatus from "../../../../../shared/TextStatus"
import { IPartialUser } from "../../../../../types/users"
import UserDataInList from "../../../../../shared/Profile/UserDataInList"
import { FlatList, ScrollView, View } from "react-native"
import styled from "styled-components/native"
import { useTranslation } from "react-i18next"

const UsersSearchList = ({ searchUsersData, searchUsersLoading }: { searchUsersData: IPartialUser[] | null, searchUsersLoading: boolean }) => {
    const { t } = useTranslation()
    if (searchUsersLoading) {
        return <LoaderContainer />
    }
    if (searchUsersData?.length === 0) {
        return (
            <TextStatus>{t("userNotFound")}</TextStatus>
        )
    }
    if (searchUsersData) {
        return (
            <StyledUsersList>
                <FlatList
                    contentContainerStyle={{ paddingBottom: 25, backgroundColor: "white" }}
                    data={searchUsersData}
                    horizontal={false}
                    scrollEnabled
                    renderItem={({ item }) => <UserDataInList userData={item} />}
                    keyExtractor={item => item.id}
                />
            </StyledUsersList>
        )
    }
    return null
}

export default UsersSearchList

const StyledUsersList = styled(View)`
  gap: 9px;
`;
