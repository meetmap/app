import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components';
import {IEvent} from '@src/types/event';
import EventLg from '@src/shared/EventInList/EventLg';
import TextStatus from '@src/shared/TextStatus';
import LoaderContainer from '@src/shared/LoaderContainer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types/NavigationProps';
import {H1} from '@src/shared/Text';
import {useTranslation} from 'react-i18next';
import {getEventsListByCids} from '@src/api/events';
import useAxiosPaginated from '@src/hooks/useAxiosPaginated';

interface IEventsListModalViewProps {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'EventsListModalView'
  >;
  route: {params: {eventCids: string[]}};
}

export const EventsListModalView = ({route}: IEventsListModalViewProps) => {
  const {data, loading, error, paginate} = useAxiosPaginated<IEvent>(page =>
    getEventsListByCids(route.params.eventCids, page),
  );
  const {t} = useTranslation();
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
      <H1 style={{paddingTop: 16, paddingHorizontal: 16}}>
        {t('eventsInThisPlace')}
      </H1>
      <FlatList
        onEndReached={data.nextPage ? paginate : null}
        ListFooterComponent={data.nextPage ? <LoaderContainer /> : null}
        contentContainerStyle={{paddingBottom: 65, paddingHorizontal: 16}}
        data={data.paginatedResults}
        horizontal={false}
        scrollEnabled
        renderItem={({item}) => <EventLg eventData={item} />}
        keyExtractor={item => item.id}
      />
    </StyledEventsListModal>
  );
};

const StyledEventsListModal = styled(View)`
  flex-direction: column;
  /* padding: 16px 16px 0 16px; */
  gap: 8px;
`;
