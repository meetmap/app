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


export interface IInviteFriendsModalViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'InviteFriendsModalView'>;
  route: any
}


const InviteFriendsModalView = ({ route }: IInviteFriendsModalViewProps) => {
  const { t } = useTranslation()
  const userData = useAppSelector(state => state.userSlice.user)!
  const { data, loading, error } = useAxios<IPartialUser[]>(getUserFriends(userData.cid))

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
  if (!data) {
    return (
      <TextStatus>{t("somethingWentWrong")}</TextStatus>
    )
  }
  return (
    <StyledEventsListModal>
      <H1>{t("userFriendsLabel", { username: route.params.username })}</H1>
      <FlatList
        contentContainerStyle={{ paddingBottom: 25, gap: 8 }}
        data={data}
        horizontal={false}
        scrollEnabled
        renderItem={({ item }) => <UserDataInInviteList userData={item} />}
        keyExtractor={item => item.id}
      />
    </StyledEventsListModal>
  )
}

export default InviteFriendsModalView

const StyledEventsListModal = styled(View)`
    flex-direction: column;;
    padding: 16px 16px 0 16px;
    gap: 8px;
`
