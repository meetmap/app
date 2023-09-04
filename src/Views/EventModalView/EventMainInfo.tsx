import React from 'react';
import { View } from 'react-native';
import { H1, P, Span } from '@src/shared/Text';
import { Line } from '@src/shared/Line';
import styled from 'styled-components';
import { IEvent } from '@src/types/event';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useCalculateDistance } from '@src/hooks/useCalculateDistance';
import { useAppSelector } from '@src/store/hooks';


interface IEventMainInfo {
    eventData: IEvent
}
const EventMainInfo = ({ eventData }: IEventMainInfo) => {
    const { t, i18n } = useTranslation()
    const userCoordinates = useAppSelector(state => state.locationSlice.userCoordinates)
    const momentLocaleFormat = {
        en: "MMM D - h A",
        ru: "D MMM - h A"
    }
    const formattedStartTime = moment(eventData?.startTime).locale(i18n.language).format(momentLocaleFormat[i18n.language as keyof typeof momentLocaleFormat]);

    const distance = useCalculateDistance(
        eventData?.location.coordinates.coordinates[1],
        eventData?.location.coordinates.coordinates[0],
        userCoordinates?.lat,
        userCoordinates?.lng
    )
    
    return (
        <View style={{ paddingHorizontal: 16, gap: 16 }}>
            <StyledEventInfoHead>
                <H1>{eventData.title}</H1>
            </StyledEventInfoHead>
            <Line />
            <StyledAdditionEventInfo>
                <View style={{ gap: 6 }}>
                    <P>
                        {eventData.location.localityName && `${eventData.location.localityName}, `}
                        {eventData.location.countryName && `${eventData.location.countryName}, `}
                        {distance} {t("fromYou")}
                    </P>
                    <P>{formattedStartTime}</P>
                </View>
                <StyledAgeLimit>
                    <Span textcolor='Grey'>
                        {eventData.ageLimit}+
                    </Span>
                </StyledAgeLimit>
            </StyledAdditionEventInfo>
            {eventData.description && <P>{eventData.description}</P>}
            {eventData.tickets.length > 0 && <Line />}
        </View>
    );
};

export default EventMainInfo;


const StyledAdditionEventInfo = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
`


const StyledEventInfoHead = styled(View)`
gap: 6px;
    /* flex-direction: ; */
    /* justify-content: space-between; */
    /* align-items: center; */
`

const StyledAgeLimit = styled(View)`
    border-radius: 10px;
    border: 1px solid #CCCFD9;
    padding: 6px;
`