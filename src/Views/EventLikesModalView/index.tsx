import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, View} from 'react-native';
import {RootStackParamList} from '@src/types/NavigationProps';
import TextStatus from '@src/shared/TextStatus';
import LoaderContainer from '@src/shared/LoaderContainer';
import {IPartialUser} from '@src/types/users';
import {useTranslation} from 'react-i18next';
import {H1} from '@src/shared/Text';
import styled from 'styled-components';
import {getEventLikes} from '@src/api/events';
import useAxiosPaginated from '@src/hooks/useAxiosPaginated';
import {InviteListProfileInfo} from '@src/shared/Profile';

interface IEventLikesModalViewProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'EventLikesModalView'
  >;
  route: {
    params: {
      eventCid: string;
    };
  };
}

export const EventLikesModalView = ({route}: IEventLikesModalViewProps) => {
  const {t} = useTranslation();
  const {data, loading, error, paginate} = useAxiosPaginated<IPartialUser>(() =>
    getEventLikes(route.params.eventCid),
  );

  if (loading) {
    return <LoaderContainer />;
  }
  if (error) {
    return <TextStatus>{error.message}</TextStatus>;
  }
  if (!data?.totalCount) {
    return <TextStatus>{t('listEmpty')}</TextStatus>;
  }
  return (
    <StyledEventsListModal>
      <H1>{t('eventLikes')}</H1>
      <FlatList
        onEndReached={data.nextPage ? () => paginate() : null}
        ListFooterComponent={data.nextPage ? <LoaderContainer /> : null}
        contentContainerStyle={{paddingBottom: 25, gap: 8}}
        data={data.paginatedResults}
        horizontal={false}
        scrollEnabled
        renderItem={({item}) => <InviteListProfileInfo userData={item} />}
        keyExtractor={item => item.cid}
      />
    </StyledEventsListModal>
  );
};

const StyledEventsListModal = styled(View)`
  flex-direction: column;
  padding: 16px 16px 0 16px;
  gap: 8px;
`;
