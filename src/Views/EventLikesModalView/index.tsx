import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import { RootStackParamList } from '../../types/NavigationProps';
import TextStatus from '../../shared/TextStatus';
import LoaderContainer from '../../shared/LoaderContainer';
import useAxios from '../../hooks/useAxios';
import { getOutcomingFrienshipRequests, getUserFriends } from '../../api/friends';
import { useAppSelector } from '../../store/hooks';
import { IPartialUser, IUserSelf } from '../../types/users';
import { useTranslation } from 'react-i18next';
import { H1 } from '../../shared/Text';
import styled from 'styled-components';
import UserDataInInviteList from '../../shared/Profile/UserDataInInviteList';
import { getEventLikes } from '../../api/events';
import useAxiosPaginated from '../../hooks/useAxiosPaginated';


export interface IEventLikesModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventLikesModalView'>;
    route: any
}


const EventLikesModalView = ({ route }: IEventLikesModalViewProps) => {
    const { t } = useTranslation()
    const { data, loading, error, paginate } = useAxiosPaginated<IPartialUser>(() => getEventLikes(route.params.eventCid))

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
            <TextStatus>{t("listEmpty")}</TextStatus>
        )
    }
    return (
        <StyledEventsListModal>
            <H1>{t("eventLikes")}</H1>
            <FlatList
                onEndReached={data.nextPage ? () => paginate() : null}
                ListFooterComponent={data.nextPage ? <LoaderContainer /> : null}
                contentContainerStyle={{ paddingBottom: 25, gap: 8 }}
                data={data.paginatedResults}
                horizontal={false}
                scrollEnabled
                renderItem={({ item }) => <UserDataInInviteList userData={item} />}
                keyExtractor={item => item.cid}
            />
        </StyledEventsListModal>
    )
}

export default EventLikesModalView

const StyledEventsListModal = styled(View)`
    flex-direction: column;;
    padding: 16px 16px 0 16px;
    gap: 8px;
`

