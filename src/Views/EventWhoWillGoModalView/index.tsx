import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { FlatList, View } from 'react-native'
import { RootStackParamList } from '@src/types/NavigationProps';
import TextStatus from '@src/shared/TextStatus';
import LoaderContainer from '@src/shared/LoaderContainer';
import { getUserFriends } from '@src/api/friends';
import { useAppSelector } from '@src/store/hooks';
import { IPartialUser } from '@src/types/users';
import { useTranslation } from 'react-i18next';
import { H1 } from '@src/shared/Text';
import styled from 'styled-components';
import useAxiosPaginated from '@src/hooks/useAxiosPaginated';
import { InviteListProfileInfo } from '@src/shared/Profile';


export interface IEventWhoWillGoModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventWhoWillGoModalView'>;
    route: {
        params: {
            username: string
        }
    }
}


const EventWhoWillGoModalView = ({ route }: IEventWhoWillGoModalViewProps) => {
    const { t } = useTranslation()
    const userData = useAppSelector(state => state.userSlice.user)!
    const { data, loading, error } = useAxiosPaginated<IPartialUser>(() => getUserFriends(userData.cid))

    if (loading) {
        return (
            <LoaderContainer />
        )
    }
    if (error) {
        return (
            <TextStatus>{error.message}</TextStatus>
        )
    }
    if (!data?.totalCount) {
        return (
            <TextStatus>{t("youDontHaveFriends")}</TextStatus>
        )
    }
    return (
        <StyledEventsListModal>
            <H1>{t("userFriendsLabel", { username: route.params.username })}</H1>
            <FlatList
                contentContainerStyle={{ paddingBottom: 25, gap: 8 }}
                data={data.paginatedResults}
                horizontal={false}
                scrollEnabled
                renderItem={({ item }) => <InviteListProfileInfo userData={item} />}
                keyExtractor={item => item.id}
            />
        </StyledEventsListModal>
    )
}

export default EventWhoWillGoModalView

const StyledEventsListModal = styled(View)`
    flex-direction: column;;
    padding: 16px 16px 0 16px;
    gap: 8px;
`

