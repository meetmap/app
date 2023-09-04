import React, { useEffect } from 'react'
import { Dimensions, NativeScrollEvent, ScrollView, View } from 'react-native'
import styled from 'styled-components/native'
import { IEvent } from '@src/types/event'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@src/types/NavigationProps'
import LoaderContainer from '@src/shared/LoaderContainer'
import { useTranslation } from 'react-i18next'
import TextStatus from '@src/shared/TextStatus'
import useAxios from '@src/hooks/useAxios'
import { getEventByCid, getSimilarEventsByCid } from '@src/api/events'
import useAxiosPaginated from '@src/hooks/useAxiosPaginated'
import PrimaryCarousel from '@src/shared/Carousel/PrimaryCarousel'
import EventMainInfo from './EventMainInfo'
import EventTags from './EventTags'
import EventTicketsInfo from './EventTicketsInfo'
import SimilarEventsData from './SimilarEventsData'
import EventFooterActions from './EventFooterActions'
import EventCreatorInfo from './EventCreatorInfo'
import { LikeButton } from '@src/shared/Buttons'
import EventStories from './EventStories'


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
    const { data: similarEventsData, paginate } = useAxiosPaginated<IEvent>((page) => getSimilarEventsByCid(route.params.eventCid, page))
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
                    <EventStories/>
                    <EventCreatorInfo creator={eventData.creator} />
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