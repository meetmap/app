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
  const navigation = useNavigation<NavigationProps>()
  const coords = useAppSelector(state => state.locationSlice.userCoordinates)
  const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
  const dispatch = useAppDispatch()
  const [image, setImage] = useState<IUploadedImage[]>([])

  const handleChangeFormValue = (valueKey: keyof IEventFormValues, value: string | Date | undefined | number) => {
    if (!value) return
    dispatch(setEventFormValuesState({ ...eventFormValues, [valueKey]: value }))
  }

  const setFiltersDateValues = (valueKey: keyof IEventFormValues, value: number | undefined) => {
    if (value)
      dispatch(setEventFormValuesState({ ...eventFormValues, [valueKey]: new Date(value) }))
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


  const miniMapRef = useRef<MapView>(null)
  useEffect(() => {
    if (eventFormValues.location) {
      miniMapRef.current?.setCamera({
        center: {
          latitude: eventFormValues.location.lat,
          longitude: eventFormValues.location.lng,
        }
      })
    }
  }, [eventFormValues.location])


  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true, selectionLimit: 10, quality: 0.1 });
    const assets = result.assets
    if (!assets) {
      return;
    }
    const assetsI: IUploadedImage[] = []
    assets.forEach(element => {
      if (element.type && element.uri && element.fileName)
        assetsI.push({
          name: element.fileName,
          type: element.type,
          uri: element.uri
        })
    });
    setImage(assetsI)
  }

  const { bottom } = useSafeAreaInsets();

  const { width } = Dimensions.get("screen")

  const [creationStatus, setCreationStatus] = useState<string | null>(null)

  const {flyTo} = useMap()
  const handleCreateEvent = async () => {
    console.log(eventFormValues)
    let coordinates
    try {
      setCreationStatus("creatingEventStatus")
      const data = await createEvent(eventFormValues)
      coordinates = data.location.coordinates
      console.log(data)
      setCreationStatus("uploadingEventImagesStatus")
      const { uploadId, status } = await uploadEventImages(data.cid, image)
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
    if (coordinates?.coordinates) flyTo({lat: coordinates.coordinates[1], lng: coordinates.coordinates[0]}, true);
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
        {image.length ?
          <View style={{ gap: 6 }}>
            <PrimaryCarousel squared data={[...image.map(image => image.uri)]} width={width - 32} height={150} />
            <TouchableOpacity onPress={pickImage}>
              <H6 textcolor='Primary'>Change images</H6>
            </TouchableOpacity>
          </View>
          :
          <StyledEventImagePicker onPress={pickImage}>
            <H5>+ Add images</H5>
          </StyledEventImagePicker>
        }

        <PrimaryFormInput label={t("eventName")} placeholder='Cool event' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("title", value)} />
        <PrimaryFormInput label={t("eventDescription")} style={{ minHeight: 90 }} multiline={true} placeholder='Descritpion' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("description", value)} />
        <View style={{ gap: 6 }}>
          <Span>Pick start/end time</Span>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 0.5 }}>
              <PrimaryDatePicker mode="spinner" display='calendar' placeholder={t("startTime")} minimumDate={new Date} initialValue={new Date} value={eventFormValues.startTime || new Date} onChange={(value) => setFiltersDateValues("startTime", value.nativeEvent.timestamp)} />
            </View>
            <View style={{ flex: 0.5 }}>
              <PrimaryDatePicker display='spinner' placeholder={t("endTime")} minimumDate={new Date} initialValue={new Date} value={eventFormValues.endTime || new Date} onChange={(value) => setFiltersDateValues("endTime", value.nativeEvent.timestamp)} />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 0.5 }}>
            <PrimaryFormInput value={t(eventFormValues.accessibility)} label={t("accessibility")} inputStyle='Primary' editable={false} onPressIn={chooseAccessibilityType} />
          </View>
        </View>
        <View style={{ gap: 6 }}>
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
        </View>
        <View style={{ gap: 6 }}>
          <Span>Tickets</Span>
          <FlatList
            data={eventFormValues.tickets}
            horizontal
            contentContainerStyle={{ gap: 6 }}
            ListHeaderComponent={
              <StyledTicket onPress={() => navigation.navigate("CreateTicketModal", { ticketIndex: undefined })} style={{ alignItems: "center", justifyContent: "center" }}>
                <P textcolor='Primary'>+ Create ticket</P>
              </StyledTicket>
            }
            renderItem={({ item, index }) => (
              <StyledTicket onPress={() => navigation.navigate("CreateTicketModal", { ticketIndex: index })}>
                <View>
                  <H5 >{item.name}</H5>
                  <P numberOfLines={3} textcolor='Grey'>{item.description}</P>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <P>Amount: {item.amount}</P>
                  <P>Price: ${item.price}</P>
                </View>
              </StyledTicket>
            )}
          />
        </View>
        <ChooseTagsComponent />
        <View style={{ gap: 8 }}>
          <Span>Choose location</Span>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChooseLocationView")}
          >
            <MapView
              ref={miniMapRef}
              initialRegion={{
                latitude: eventFormValues.location?.lat || coords?.lat || 0,
                longitude: eventFormValues.location?.lng || coords?.lng || 0,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
              }}
              style={{ height: 200, width: "100%", borderRadius: 20, pointerEvents: "none" }}
            />
            {!eventFormValues.location?.lat && !eventFormValues.location?.lng ?
              <StyledPickAction style={{ backgroundColor: "#f8fbff47" }}>
                <P>Pick location</P>
              </StyledPickAction> :
              <StyledPickAction>
                <StyledPinImage source={require('../../assets/LogoPin.png')} />
              </StyledPickAction>
            }
          </TouchableOpacity>
        </View>
        <PrimaryButton onPress={handleCreateEvent} title={t("submit")} />
      </View>
    </ScrollView>
  )
}

export default CreateEventView

const StyledEventImagePicker = styled(TouchableOpacity)`
      height: 250px;
      width: 100%;
      border-radius: 20px;
      border: solid 1px #E6EAF2;
      overflow: hidden;
      align-items: center;
      justify-content: center;
      `
const StyledPinImage = styled(Image)`
      /* top: -50%;
      left: 50%; */
      top: -20px;
      width: 40px;
      height: 40px;
`

const StyledPickAction = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  /* background-color: #f8fbff47; */
`

const StyledTicket = styled(TouchableOpacity)`
  border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
  width: 200px;
  height: 150px;
  gap: 6px;
  padding: 16px;
  justify-content: space-between;
  border-radius: 16px;
`