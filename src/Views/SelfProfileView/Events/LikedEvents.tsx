import { useCallback, useEffect, useState } from 'react';
import { IEvent } from '../../../types/event';
import { getLikedEvents } from '../../../api/events';
import LoaderContainer from '../../../shared/LoaderContainer';
import TextStatus from '../../../shared/TextStatus';
import EventLg from '../../../shared/EventInList/EventLg';
import styled from 'styled-components/native';
import {
    FlatList,
    ListRenderItem,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import useAxios from '../../../hooks/useAxios';
import { H3 } from '../../../shared/Text';
import { IPaginateRespose } from '../../../types/response';
import useAxiosPaginated from '../../../hooks/useAxiosPaginated';
import { AxiosError } from 'axios';

const LikedEvents = ({ likedEvents, likedEventsError, likedEventsLoading }: { likedEvents: IPaginateRespose<IEvent> | null, likedEventsError: AxiosError<unknown, any> | null, likedEventsLoading: boolean }) => {

    const { t } = useTranslation();

    if (likedEventsLoading) {
        return <LoaderContainer />;
    }
    if (likedEventsError) {
        return <TextStatus>{likedEventsError.message}</TextStatus>;
    }
    if (!likedEvents?.totalCount) {
        return <TextStatus>{t('youDontHaveLikedEvents')}</TextStatus>;
    }
    return (
        <StyledLikedEventsContainer>
            <FlatList
                // onEndReached={paginate}
                ListFooterComponent={likedEvents.nextPage ? <LoaderContainer /> : null}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 25 }}
                data={likedEvents.paginatedResults}
                renderItem={({ item }) => <EventLg eventData={item} />}
                keyExtractor={item => item.id}
            />
        </StyledLikedEventsContainer>
    );
};

export default LikedEvents;

const StyledLikedEventsContainer = styled(View)`
  background-color: white;
  flex: 1;
`;
