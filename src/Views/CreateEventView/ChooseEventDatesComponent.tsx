import React from 'react'
import { View } from 'react-native'
import { Span } from '@src/shared/Text'
import PrimaryDatePicker from '@src/shared/Input/PrimaryDatePicker'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { StyledCreateEventFormContainer } from '.'
import { setEventFormValuesState } from '@src/store/slices/createEventFormSlice'
import { ICreateEventFormValues } from '@src/types/event'

const ChooseEventDatesComponent = () => {
    const { t } = useTranslation()
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
    const dispatch = useAppDispatch()
    const setFiltersDateValues = (valueKey: keyof ICreateEventFormValues, value: number | undefined) => {
        if (value)
            dispatch(setEventFormValuesState({ ...eventFormValues, [valueKey]: new Date(value) }))
    }
    return (
        <StyledCreateEventFormContainer>
            <Span>Pick start/end time</Span>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <View style={{ flex: 0.5 }}>
                    <PrimaryDatePicker display="spinner" placeholder={t("startTime")} minimumDate={new Date} value={eventFormValues.startTime} onChange={(value) => setFiltersDateValues("startTime", value.nativeEvent.timestamp)} />
                </View>
                <View style={{ flex: 0.5 }}>
                    <PrimaryDatePicker display='spinner' placeholder={t("endTime")} minimumDate={new Date} value={eventFormValues.endTime} onChange={(value) => setFiltersDateValues("endTime", value.nativeEvent.timestamp)} />
                </View>
            </View>
        </StyledCreateEventFormContainer>
    )
}

export default ChooseEventDatesComponent