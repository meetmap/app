import React, { useEffect, useState } from 'react'
import { Linking, View } from 'react-native'
import styled from 'styled-components/native'
import LikeButton from '../../shared/Buttons/LikeButton'
import { Image } from 'react-native-svg'
import LoadableImage from '../../shared/LoadableImage/LoadableImage'
import { IEvent } from '../../types/event'
import { getEventById } from '../../api/events'
import { H1, P, Span } from '../../shared/Text'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/NavigationProps'
import TicketIcon from '../../shared/Icons/TicketIcon'
import PrimarySmallButton from '../../shared/Buttons/PrimarySmallButton'
import LoaderContainer from '../../shared/LoaderContainer'


export interface IEventModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventModalView'>;
}

const EventModalView = (props: IEventModalViewProps) => {
    const [eventData, setEventData] = useState<IEvent | null>(null)
    const [eventDataLoading, setEventDataLoading] = useState<boolean>(false)
    const getEvent = async () => {
        setEventDataLoading(true)
        const event = await getEventById(props.route.params.eventId as string)
        setEventDataLoading(false)
        setEventData(event)

    }
    useEffect(() => {
        getEvent()
    }, [])

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
    if(eventDataLoading){
        return (
            <LoaderContainer/>
        )
    }
    if (eventData)
        return (
            <View >
                <StyledEventModalContent>
                    <StyledEventImgContainer>
                        <LoadableImage source={{ uri: eventData.picture }} />
                        <LikeButton eventId={eventData.id} isLiked={false} />
                    </StyledEventImgContainer>
                    <EventInfoContainer>
                        <StyledEventInfoHead>
                            <H1>
                                {eventData.title}
                            </H1>
                            <StyledAgeLimit>
                                <Span textcolor='Grey'>
                                    {eventData.ageLimit}+
                                </Span>
                            </StyledAgeLimit>
                        </StyledEventInfoHead>
                        <P>
                            {eventData?.description}
                        </P>
                    </EventInfoContainer>
                    <StyledEventFooter>
                        <PrimaryButton onPress={handleBuyTicketOpenLink} btnType='Primary'><TicketIcon />Buy tickets</PrimaryButton>
                        <StyledEventFooterActions>
                            <PrimarySmallButton btnType='Secondary'>Invite friend</PrimarySmallButton>
                            <PrimarySmallButton btnType='Secondary'>See who goes</PrimarySmallButton>
                            <PrimarySmallButton btnType='Secondary'>I will go</PrimarySmallButton>
                        </StyledEventFooterActions>
                    </StyledEventFooter>
                </StyledEventModalContent>
            </View>
        )
    return null
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
    gap: 8px;
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
    gap: 6px;
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
    gap: 6px;
`