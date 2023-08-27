import React, { useEffect, useRef, useState } from 'react'
import { ActionSheetIOS, Dimensions, FlatList, Image, Modal, SafeAreaView, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { ICoordinates } from '../../types/location'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import PrimaryDatePicker from '../../shared/Input/PrimaryDatePicker'
import { H2, H5, H6, P, Span, Title } from '../../shared/Text'
import { trigger } from 'react-native-haptic-feedback'
import { t } from 'i18next'
import Slider from '@react-native-community/slider'
import styled from 'styled-components'
import MapView, { Marker } from 'react-native-maps'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../types/NavigationProps'
import { setEventFormValuesState } from '../../store/slices/createEventFormSlice'
import { launchImageLibrary } from 'react-native-image-picker'
import { IUploadedImage, checkAssetsUploadStatus } from '../../api/users'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import EventCarousel from '../../shared/Carousel'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import PrimaryCarousel from '../../shared/Carousel/PrimaryCarousel'
import ChooseTagsComponent from './ChooseTagsComponent'
import { IFilters } from '../../store/slices/filtersSlice'
import { createEvent, uploadEventImages } from '../../api/events'
import LoaderContainer from '../../shared/LoaderContainer'
import { useMap } from '../../hooks/MapProvider'
import { ITicket } from '../../types/event'
import PrimaryTicket from '../../shared/Ticket/PrimaryTicket'
import ChooseImagesComponent from './ChooseImagesComponent'
import ChooseAccessibilityTypeComponent from './ChooseAccessibilityTypeComponent'
import ChooseEventDatesComponent from './ChooseEventDatesComponent'
import CreateTicketsComponent from './CreateTicketsComponent'
import ChangeEventMinAgeComponent from './ChangeEventMinAgeComponent'
import ChooseEventLocationComponent from './ChooseEventLocationComponent'

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


const CreateEventView = () => {
  const navigation = useNavigation<NavigationProps>()
  const { eventFormValues, images } = useAppSelector(state => state.createEventFormSlice)
  const dispatch = useAppDispatch()

  const handleChangeFormValue = (valueKey: keyof IEventFormValues, value: string | Date | undefined | number) => {
    if (!value) return
    dispatch(setEventFormValuesState({ ...eventFormValues, [valueKey]: value }))
  }




  const { bottom } = useSafeAreaInsets();

  const [creationStatus, setCreationStatus] = useState<string | null>(null)

  const { flyTo } = useMap()
  const handleCreateEvent = async () => {
    let coordinates
    try {
      setCreationStatus("creatingEventStatus")
      const data = await createEvent(eventFormValues)
      coordinates = data.location.coordinates
      setCreationStatus("uploadingEventImagesStatus")
      const { uploadId, status } = await uploadEventImages(data.cid, images)
      if (status == "failed") {
        throw Error("Upload failed");
      }
      await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
          try {
            const { status: checkStatus } = await checkAssetsUploadStatus(uploadId)
            if (checkStatus === "succeed") {
              clearInterval(interval)
              resolve(status)
            }
            if (checkStatus == "failed") {
              reject("Upload failed")
            }
          } catch (error) {
            clearInterval(interval)
          }
        }, 500)
      })
    } catch (error) {
      console.error(error)
    }
    setCreationStatus(null)
    navigation.navigate("MainView")
    if (coordinates?.coordinates) flyTo({ lat: coordinates.coordinates[1], lng: coordinates.coordinates[0] }, true);
  }
  
  if (creationStatus) {
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Title style={{ marginTop: 100 }}>{t(creationStatus)}</Title>
        <LoaderContainer />
      </View>
    )
  }
  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 12, paddingBottom: bottom }}>
        <ChooseImagesComponent />
        <PrimaryFormInput label={t("eventName")} placeholder='Cool event' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("title", value)} />
        <PrimaryFormInput label={t("eventDescription")} style={{ minHeight: 90 }} multiline={true} placeholder='Descritpion' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("description", value)} />
        <ChooseEventDatesComponent />
        <StyledCreateEventFormContainer style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.5 }}>
            <ChooseAccessibilityTypeComponent handleChangeFormValue={handleChangeFormValue} />
          </View>
        </StyledCreateEventFormContainer>
        <ChangeEventMinAgeComponent handleChangeFormValue={handleChangeFormValue} />
        <CreateTicketsComponent />
        <ChooseTagsComponent />
        <ChooseEventLocationComponent />
        <PrimaryButton onPress={handleCreateEvent} title={t("submit")} />
      </View>
    </ScrollView>
  )
}

export default CreateEventView

export const StyledCreateEventFormContainer = styled(View)`
  gap: 6px;
`