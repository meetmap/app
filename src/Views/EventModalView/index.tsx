import React, { useEffect, useState } from 'react'
import { FlatList, Linking, ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import LikeButton from '../../shared/Buttons/LikeButton'
import { IEvent } from '../../types/event'
import { getEventById } from '../../api/events'
import { H1, H3, P, Span } from '../../shared/Text'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import TicketIcon from '../../shared/Icons/TicketIcon'
import PrimarySmallButton from '../../shared/Buttons/PrimarySmallButton'
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
import InfoIcon from '../../shared/Icons/InfoIcon'


export interface IEventModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventModalView'>;
}

const EventModalView = (props: IEventModalViewProps) => {
    const { data: eventData, loading: eventDataLoading, error } = useAxios<IEvent>(getEventById(props.route.params.eventId))
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
    if (!eventData) {
        return (
            <TextStatus>{t("somethingWentWrong")}</TextStatus>
        )
    }
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 24}}>
            <StyledEventModalContent>
                <StyledEventImgContainer>
                    <EventCarousel eventsImagesList={eventData.assets} />
                    <LikeButton eventId={eventData.id} isLiked={eventData.userStats.isUserLike} />
                </StyledEventImgContainer>
                <EventInfoContainer>
                    <StyledEventInfoHead>
                        <H1>
                            {eventData.title}
                        </H1>
                    </StyledEventInfoHead>
                    <Line />
                    <StyledAdditionEventInfo>
                        <View style={{ gap: 6 }}>
                            {distance &&
                                <P>{distance} {t("fromYou")}</P>
                            }
                            <P>{formattedStartTime}</P>
                        </View>
                        <StyledAgeLimit>
                            <Span textcolor='Grey'>
                                {eventData.ageLimit}+
                            </Span>
                        </StyledAgeLimit>
                    </StyledAdditionEventInfo>
                    {/* <Line /> */}
                    <P>
                        {eventData?.description}
                    </P>
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
                </EventInfoContainer>
                <StyledEventFooter>
                    <PrimaryMediumButton onPress={handleBuyTicketOpenLink} btnType='Primary' title={t("buyTickets")}><TicketIcon /></PrimaryMediumButton>
                    <StyledEventFooterActions>
                        <PrimaryMediumButton onPress={() => props.navigation.navigate("InviteFriendsModalView", { eventId: eventData.id })} style={{ flex: 1 }} btnType='Secondary' title={t("inviteFriend")} />
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
    padding: 0 16px;
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
    a{
        flex: 1;
        button{
            width: 100%;
        }
    }
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