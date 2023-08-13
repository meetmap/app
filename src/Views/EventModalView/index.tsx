import React from 'react'
import { FlatList, Linking, ScrollView, View } from 'react-native'
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
import EventCarousel from '../../shared/Carousel'
import useAxios from '../../hooks/useAxios'
import EventTag from '../../shared/Tags/EventTag'
import { getEventByCid } from '../../api/events'


export interface IEventModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventModalView'>;
    route: {
        params: {
            eventCid: string
        }
    }
}

const EventModalView = ({route, navigation}: IEventModalViewProps) => {
    const { data: eventData, loading: eventDataLoading, error } = useAxios<IEvent>(getEventByCid(route.params.eventCid))
    const userCoordinates = useAppSelector(state => state.locationSlice.userCoordinates)

    const { t, i18n } = useTranslation()

    const handleBuyTicketOpenLink = () => {
        if (eventData?.link) {
            Linking.canOpenURL(eventData.link).then(supported => {
                if (supported) {
                    Linking.openURL(eventData.link);
                } else {
                    console.log("Don't know how to open URI: " + eventData.link);
                }
            });
        }
    };
    const distance = useCalculateDistance(
        eventData?.location.coordinates.coordinates[1],
        eventData?.location.coordinates.coordinates[0],
        userCoordinates?.lat,
        userCoordinates?.lng
    )
    const momentLocaleFormat = {
        en: "MMM D - h A",
        ru: "D MMM - h A"
    }
    const formattedStartTime = moment(eventData?.startTime).locale(i18n.language).format(momentLocaleFormat[i18n.language as keyof typeof momentLocaleFormat]);
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
        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
            <StyledEventModalContent>
                <StyledEventImgContainer>
                    <EventCarousel eventsImagesList={eventData.assets} />
                    <LikeButton likeCount={eventData.stats.likes} eventCid={eventData.cid} isLiked={eventData.userStats.isUserLike} />
                </StyledEventImgContainer>
                <EventInfoContainer>
                    <View style={{ paddingHorizontal: 16, gap: 16 }}>
                        <StyledEventInfoHead>
                            <H1>
                                {eventData.title}
                            </H1>
                        </StyledEventInfoHead>
                        <Line />
                        <StyledAdditionEventInfo>
                            <View style={{ gap: 6 }}>
                                <P> {eventData.location.city}, {eventData.location.country}, {distance} {t("fromYou")}</P>
                                <P>{formattedStartTime}</P>
                            </View>
                            <StyledAgeLimit>
                                <Span textcolor='Grey'>
                                    {eventData.ageLimit}+
                                </Span>
                            </StyledAgeLimit>
                        </StyledAdditionEventInfo>
                        <P>
                            {eventData?.description}
                        </P>
                        {eventData.tickets.length > 0 &&
                            <Line />
                        }
                    </View>
                    {eventData.tickets.length > 0 &&
                        <StyledTicketsView>
                            <H3 style={{ paddingHorizontal: 16 }}>{t("tickets")}</H3>
                            <FlatList
                                contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
                                data={eventData.tickets}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                scrollEnabled
                                renderItem={({ item }) => (
                                    <StyledTicket>
                                        <StyledTicketHeader>
                                            <H6>{item.name}</H6>
                                            <P>{item.amount !== -1 && item.amount}</P>
                                        </StyledTicketHeader>
                                        {/* {item.description &&
                                        <P>{item.description}</P>
                                    } */}
                                    </StyledTicket>
                                )}
                                keyExtractor={item => item.name}
                            />
                        </StyledTicketsView>
                    }
                    <View style={{ paddingHorizontal: 16, gap: 16 }}>
                        <Line />
                        <StyledTagsView>
                            <View style={{ flexDirection: "row" }}>
                                <H3>{t("tags")}</H3>
                                {/* <TouchableOpacity>
                                <InfoIcon />
                            </TouchableOpacity> */}
                            </View>
                            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                                {eventData.tags.map(tag => (
                                    <EventTag key={tag.cid} tag={tag} />
                                ))}
                            </View>
                        </StyledTagsView>
                    </View>
                </EventInfoContainer>
                <StyledEventFooter>
                    <PrimaryMediumButton onPress={handleBuyTicketOpenLink} btnType='Primary' title={t("buyTickets")}><TicketIcon /></PrimaryMediumButton>
                    <StyledEventFooterActions>
                        <PrimaryMediumButton onPress={() => navigation.navigate("InviteFriendsModalView", { eventCid: eventData.cid })} style={{ flex: 1 }} btnType='Secondary' title={t("inviteFriend")} />
                        <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title={t("seeWhoGoes")} />
                        <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title={t("iWillGo")} />
                    </StyledEventFooterActions>
                </StyledEventFooter>
            </StyledEventModalContent>
            {/* <StyledSimilarEventsContainer>
                <H3 style={{paddingLeft: 16}}>{t("similarEvents")}</H3>
                <StyledSimilarEvents
                    contentContainerStyle={{ paddingBottom: 25, paddingHorizontal: 16, gap: 8 }}
                    data={[eventData, eventData, eventData, eventData] as IEvent[]}
                    horizontal={true}
                    scrollEnabled
                    renderItem={({ item }) => <EventSm eventData={item as IEvent} />}
                    keyExtractor={item => item.id}
                />
            </StyledSimilarEventsContainer> */}
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

const StyledEventInfoHead = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const StyledAgeLimit = styled(View)`
    border-radius: 10px;
    border: 1px solid #CCCFD9;
    padding: 6px;
`
const StyledEventFooter = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
`
const StyledEventFooterActions = styled(View)`
    flex-direction: row;
    gap: 12px;
`
const StyledAdditionEventInfo = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`
const StyledTicketsView = styled(View)`
    gap: 12px;
    /* padding: 0 -16px; */
`
const StyledTicket = styled(View)`
    width: 200px;
    gap: 6px;
    padding: 8px;
    border-radius: 8px;
    border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
`
const StyledTicketHeader = styled(View)`
    justify-content: space-between;
    flex-direction: row;
`
const StyledTagsView = styled(View)`
    gap: 6px;
`
const StyledSimilarEventsContainer = styled(View)`
    gap: 6px;
    padding-top: 24px;
`
const StyledSimilarEvents = styled(FlatList)`
    flex-direction: row;
    gap: 6px;
`