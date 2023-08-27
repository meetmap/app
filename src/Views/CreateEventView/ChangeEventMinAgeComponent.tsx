import React from 'react'
import { IEventFormValues, StyledCreateEventFormContainer } from '.'
import { View } from 'react-native'
import { P, Span } from '../../shared/Text'
import Slider from '@react-native-community/slider'
import { useAppSelector } from '../../store/hooks'
import { useTranslation } from 'react-i18next'

const ChangeEventMinAgeComponent = ({ handleChangeFormValue }: { handleChangeFormValue: (valueKey: keyof IEventFormValues, value: string | Date | undefined | number) => void }) => {
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
    const { t } = useTranslation()
    return (
        <StyledCreateEventFormContainer>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                <Span>{t("ageLimit")}</Span>
                <P>{eventFormValues.ageLimit === 1 ? t("allAges") : `${eventFormValues.ageLimit}+`}</P>
            </View>
            <Slider
                style={{ flex: 1 }}
                step={1}
                value={eventFormValues.ageLimit}
                minimumValue={1}
                maximumValue={35}
                tapToSeek
                onValueChange={(value) => handleChangeFormValue("ageLimit", value)}
                minimumTrackTintColor="#2671FF"
                maximumTrackTintColor="#F2F5FA"
            />
        </StyledCreateEventFormContainer>
    )
}

export default ChangeEventMinAgeComponent