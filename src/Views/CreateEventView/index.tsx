import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ICoordinates } from '@src/types/location'
import PrimaryFormInput from '@src/shared/Input/PrimaryFormInput'
import { Title } from '@src/shared/Text'
import { t } from 'i18next'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'
import { setEventFormValuesState } from '@src/store/slices/createEventFormSlice'
import { checkAssetsUploadStatus } from '@src/api/users'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ChooseTagsComponent from './ChooseTagsComponent'
import { createEvent, uploadEventImages } from '@src/api/events'
import LoaderContainer from '@src/shared/LoaderContainer'
import { useMap } from '@src/hooks/MapProvider'
import { ITicket } from '@src/types/event'
import ChooseImagesComponent from './ChooseImagesComponent'
import ChooseAccessibilityTypeComponent from './ChooseAccessibilityTypeComponent'
import ChooseEventDatesComponent from './ChooseEventDatesComponent'
import CreateTicketsComponent from './CreateTicketsComponent'
import ChangeEventMinAgeComponent from './ChangeEventMinAgeComponent'
import ChooseEventLocationComponent from './ChooseEventLocationComponent'
import { PrimaryButton } from '@src/shared/Buttons'

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