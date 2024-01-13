import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components';
import TextStatus from '@src/shared/TextStatus';
import LoaderContainer from '@src/shared/LoaderContainer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types/NavigationProps';
import {H1} from '@src/shared/Text';
import {getFriendsListByCId} from '@src/api/friends';
import {IPartialUser} from '@src/types/users';
import {useTranslation} from 'react-i18next';
import {IPaginateRespose} from '@src/types/response';
import {ListProfileInfo} from '@src/shared/Profile';

interface IEventsListModalViewProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'EventsListModalView'
  >;
  route: {
    params: {
      userCId: string;
      username: string;
    };
  };
}

export const UsersListModalView = ({route}: IEventsListModalViewProps) => {
  const {t} = useTranslation();
  const [usersListData, setUsersListData] =
    useState<IPaginateRespose<IPartialUser> | null>(null);
  const [usersListDataLoading, setUsersListDataLoading] =
    useState<boolean>(false);

  const getUsersByIds = async () => {
    setUsersListDataLoading(true);
    const usersData = await getFriendsListByCId(route.params.userCId);
    setUsersListData(usersData);
    setUsersListDataLoading(false);
  };
  useEffect(() => {
    getUsersByIds();
  }, []);

  if (usersListDataLoading) {
    return <LoaderContainer />;
  }
  if (!usersListData) {
    return <TextStatus>{t('somethingWentWrong')}</TextStatus>;
  }
  return (
    <StyledEventsListModal>
      <H1>{t('userFriendsLabel', {username: route.params.username})}</H1>
      <FlatList
        contentContainerStyle={{paddingBottom: 25, gap: 8}}
        data={usersListData.paginatedResults}
        horizontal={false}
        scrollEnabled
        renderItem={({item}) => <ListProfileInfo userData={item} />}
        keyExtractor={item => item.id}
      />
    </StyledEventsListModal>
  );
};

const StyledEventsListModal = styled(View)`
  flex-direction: column;
  padding: 16px 16px 0 16px;
  gap: 8px;
`;
