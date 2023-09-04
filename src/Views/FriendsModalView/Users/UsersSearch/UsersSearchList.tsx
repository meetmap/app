import React from "react"
import { FlatList, View } from "react-native"
import styled from "styled-components/native"
import { useTranslation } from "react-i18next"
import LoaderContainer from "@src/shared/LoaderContainer"
import { IPartialUser } from "@src/types/users"
import TextStatus from "@src/shared/TextStatus"
import { ListProfileInfo } from "@src/shared/Profile"

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
                    renderItem={({ item }) => <ListProfileInfo userData={item} />}
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
