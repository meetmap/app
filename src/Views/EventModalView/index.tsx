import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
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


export interface IEventModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'EventModalView'>;
}

const EventModalView = (props: IEventModalViewProps) => {
    const [eventData, setEventData] = useState<IEvent | null>(null)
    const getEvent = async () => {
        const event = await getEventById(props.route.params.eventId as string)
        setEventData(event)
    }
    useEffect(() => {
        getEvent()
    }, [])

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
                            <Span>
                                {eventData.ageLimit}+
                            </Span>
                        </StyledEventInfoHead>
                        <P>
                            {eventData?.description}
                        </P>
                    </EventInfoContainer>
                    <StyledEventFooter>
                        {/* <a href={eventData?.link}>
                            <PrimaryButton btnType='Primary'><TicketIcon />Buy tickets</PrimaryButton>
                        </a> */}
                        <StyledEventFooterActions>
                            <PrimaryButton btnType='Secondary'>Invite friend</PrimaryButton>
                            <PrimaryButton btnType='Secondary'>See who goes</PrimaryButton>
                            <PrimaryButton btnType='Secondary'>I will go</PrimaryButton>
                        </StyledEventFooterActions>
                    </StyledEventFooter>
                </StyledEventModalContent>
            </View>
        )
    return (eventData)
}

export default EventModalView


const StyledEventModalContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 24px;
`

const StyledEventImgContainer = styled(View)`
    position: relative;
    img{
        width: 100%;
        height: 250px;
        object-fit: cover;
    }
`

const EventInfoContainer = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0 16px;
    gap: 8px;
`

const StyledEventInfoHead = styled(View)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        border-radius: 10px;
        border: 1px solid #CCCFD9;
        padding: 6px;
        color: #8D9099;
    }
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
    display: flex;
    gap: 6px;
`