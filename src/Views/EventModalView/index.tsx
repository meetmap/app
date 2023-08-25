import React, { useEffect } from 'react'
import { Dimensions, FlatList, Linking, NativeScrollEvent, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import LikeButton from '../../shared/Buttons/LikeButton'
import { IEvent } from '../../types/event'
import { H1, H3, H6, P, Span } from '../../shared/Text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import TicketIcon from '../../shared/Icons/TicketIcon'
import LoaderContainer from '../../shared/LoaderContainer'
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton'
import { useTranslation } from 'react-i18next'
import TextStatus from '../../shared/TextStatus'
import { useCalculateDistance } from '../../hooks/useCalculateDistance'
import moment from 'moment'
import { useAppSelector } from '../../store/hooks'
import { Line } from '../../shared/Line'
import useAxios from '../../hooks/useAxios'
import EventTag from '../../shared/Tags/EventTag'
import { getEventByCid, getSimilarEventsByCid } from '../../api/events'
import EventLg from '../../shared/EventInList/EventLg'
import useAxiosPaginated from '../../hooks/useAxiosPaginated'
import PrimaryCarousel from '../../shared/Carousel/PrimaryCarousel'
import MyBottomSheet from '../MyBottomSheet'
import AppBottomSheet from '../../shared/AppBottomSheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import EventMainInfo from './EventMainInfo'
import EventTags from './EventTags'
import EventTicketsInfo from './EventTicketsInfo'
import SimilarEventsData from './SimilarEventsData'
import EventFooterActions from './EventFooterActions'


export interface IEventModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventModalView'>;
    route: {
        params: {
            eventCid: string
        }
    }
}

const EventModalView = ({ route, navigation }: IEventModalViewProps) => {
    const { data: eventData, loading: eventDataLoading, error } = useAxios<IEvent>(getEventByCid(route.params.eventCid))
    const { data: similarEventsData, loading: similarEventsLoading, paginate } = useAxiosPaginated<IEvent>((page) => getSimilarEventsByCid(route.params.eventCid, page))
    const { width } = Dimensions.get("screen")
    const { t } = useTranslation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: eventData?.title
        });
    }, [!!eventData])


    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
        const paddingToBottom = 10;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    if (eventDataLoading) {
        return (
            <LoaderContainer />
        )
    }
    if (error) {
        return (
            <TextStatus>{error.message}</TextStatus>
        )
    }
    if (!eventData) {
        return (
            <TextStatus>{t("somethingWentWrong")}</TextStatus>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 24 }}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    paginate()
                }
            }}
            scrollEventThrottle={16}
        >
            <StyledEventModalContent>
                <StyledEventImgContainer>
                    <PrimaryCarousel data={eventData.assets} width={width} height={250} />
                    <LikeButton likeCount={eventData.stats.likes} eventCid={eventData.cid} isLiked={eventData.userStats.isUserLike} />
                </StyledEventImgContainer>
                <EventInfoContainer>
                    <EventMainInfo eventData={eventData} />
                    <EventTicketsInfo tickets={eventData.tickets} />
                    <EventTags tags={eventData.tags} />
                </EventInfoContainer>
                <EventFooterActions link={eventData.link} eventCid={eventData.cid} />
            </StyledEventModalContent>
            <SimilarEventsData similarEventsData={similarEventsData} />
        </ScrollView>
    )
}

export default EventModalView


const StyledEventModalContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const StyledEventImgContainer = styled(View)`
    position: relative;
    height: 250px;
`

const EventInfoContainer = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
`