import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'
import { IEvent } from '../../types/event'
import EventLg from '../../shared/EventInList/EventLg'
import TextStatus from '../../shared/TextStatus'
import LoaderContainer from '../../shared/LoaderContainer'
import { getEventsListByIds } from '../../api/events'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import { H1 } from '../../shared/Text'
import { getFriendsListByCId } from '../../api/friends'
import { IPartialUser } from '../../types/users'
import UserDataInList from '../../shared/Profile/UserDataInList'
import { useTranslation } from 'react-i18next'


export interface IEventsListModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventsListModalView'>;
}


const UsersListModalView = ({ route }: IEventsListModalViewProps) => {
    const { t } = useTranslation()
    const [usersListData, setUsersListData] = useState<IPartialUser[] | null>(null)
    const [usersListDataLoading, setUsersListDataLoading] = useState<boolean>(false)

    const getUsersByIds = async () => {
        setUsersListDataLoading(true)
        const usersData = await getFriendsListByCId(route.params.userCId)
        setUsersListData(usersData)
        setUsersListDataLoading(false)
    }
    useEffect(() => {
        getUsersByIds()
    }, [])


    if (usersListDataLoading) {
        return (
            <LoaderContainer />
        )
    }
    if (!usersListData) {
        return (
            <TextStatus>{t("somethingWentWrong")}</TextStatus>
        )
    }
    return (
        <StyledEventsListModal>
            <H1>{t("userFriendsLabel", {username: route.params.username})}</H1>
            <FlatList
                contentContainerStyle={{ paddingBottom: 25, gap: 8 }}
                data={usersListData}
                horizontal={false}
                scrollEnabled
                renderItem={({ item }) => <UserDataInList userData={item} />}
                keyExtractor={item => item.id}
            />
        </StyledEventsListModal>
    )
}

export default UsersListModalView

const StyledEventsListModal = styled(View)`
    flex-direction: column;
    padding: 16px 16px 0 16px;
    gap: 8px;
`

