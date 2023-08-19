import React, { useState } from 'react'
import { ActionSheetIOS, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { ICoordinates } from '../../types/location'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import PrimaryDatePicker from '../../shared/Input/PrimaryDatePicker'
import { P, Span } from '../../shared/Text'
import { trigger } from 'react-native-haptic-feedback'
import { t } from 'i18next'
import Slider from '@react-native-community/slider'

export interface IEventFormValues {
  title: string
  description: string
  accessibility: "public" | "private"
  startTime: Date | null
  endTime: Date | null
  ageLimit: number
  location: ICoordinates | null
  tickets: ITicket[]
  tagsCids: string[]
}

export interface ITicket {
  name: string
  price: number
  amount: number
  description: string
}


const CreateEventView = () => {
  const [eventImages, setEventImages] = useState()
  const [createEventFormValue, setCreateEventFormValue] = useState<IEventFormValues>({
    title: "",
    description: "",
    accessibility: "public",
    startTime: null,
    endTime: null,
    ageLimit: 1,
    location: null,
    tickets: [],
    tagsCids: []
  })

  const handleChangeFormValue = (valueKey: keyof IEventFormValues, value: string | Date | undefined | number) => {
    if (!value) return
    setCreateEventFormValue((state) => ({ ...state, [valueKey]: value }))
  }

  const setFiltersDateValues = (name: keyof IEventFormValues, value: number | undefined) => {
    if (value)
    setCreateEventFormValue((state) => ({ ...state, [name]: new Date(value) }))
}

  const chooseAccessibilityType = () => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [t("cancel"), t("public"), t("private")],
        cancelButtonIndex: 0,
      },
      async buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          handleChangeFormValue("accessibility", "public")
        } else if (buttonIndex === 2) {
          handleChangeFormValue("accessibility", "private")
        }
      },
    );
  }



  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 12 }}>
        <PrimaryFormInput label='Event name' placeholder='Cool event' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("title", value)} />
        <PrimaryFormInput label='Event description' style={{ minHeight: 90 }} multiline={true} placeholder='Descritpion' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("description", value)} />
        <View style={{ gap: 6 }}>
          <Span>Pick start/end time</Span>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 0.5 }}>
              <PrimaryDatePicker mode="datetime" display='calendar' placeholder={t("startTime")} minimumDate={new Date} initialValue={new Date} value={createEventFormValue.startTime || new Date} onChange={(value) => setFiltersDateValues("startTime", value.nativeEvent.timestamp)} />
            </View>
            <View style={{ flex: 0.5 }}>
              <PrimaryDatePicker display='spinner' placeholder={t("endTime")} minimumDate={new Date} initialValue={new Date} value={createEventFormValue.endTime || new Date} onChange={(value) => setFiltersDateValues("endTime", value.nativeEvent.timestamp)} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 0.5 }}>
            <PrimaryFormInput value={t(createEventFormValue.accessibility)} label='Accessibility' inputStyle='Primary' editable={false} onPressIn={chooseAccessibilityType} />
          </View>
          {/* <View style={{ flex: 0.5 }}>
            <PrimaryFormInput value={createEventFormValue.ageLimit.toString()} keyboardType='numeric' label='Min age limit' inputStyle='Primary' onChangeText={(value) => handleChangeNumberFormValue("ageLimit", value)} />
          </View> */}
        </View>
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <Span>{t("ageLimit")}</Span>
            <P>{createEventFormValue.ageLimit === 1 ? t("allAges") : `${createEventFormValue.ageLimit}+`}</P>
          </View>
          <Slider
            style={{ flex: 1 }}
            step={1}
            value={createEventFormValue.ageLimit}
            minimumValue={1}
            maximumValue={21}
            tapToSeek
            onValueChange={(value) => handleChangeFormValue("ageLimit", value)}
            minimumTrackTintColor="#2671FF"
            maximumTrackTintColor="#F2F5FA"
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default CreateEventView