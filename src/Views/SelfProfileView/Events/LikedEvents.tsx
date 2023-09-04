import { IEvent } from '@src/types/event';
import LoaderContainer from '@src/shared/LoaderContainer';
import TextStatus from '@src/shared/TextStatus';
import EventLg from '@src/shared/EventInList/EventLg';
import styled from 'styled-components/native';
import {
    FlatList,
    View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { IPaginateRespose } from '@src/types/response';
import { AxiosError } from 'axios';

const LikedEvents = ({ likedEvents, likedEventsError, likedEventsLoading }: { likedEvents: IPaginateRespose<IEvent> | null, likedEventsError: AxiosError<unknown> | null, likedEventsLoading: boolean }) => {

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
