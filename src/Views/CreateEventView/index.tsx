import React, { useEffect, useRef, useState } from 'react'
import { ActionSheetIOS, FlatList, Image, Modal, SafeAreaView, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { ICoordinates } from '../../types/location'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import PrimaryDatePicker from '../../shared/Input/PrimaryDatePicker'
import { H6, P, Span } from '../../shared/Text'
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
import { IUploadedImage } from '../../api/users'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'

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
  const [image, setImage] = useState<IUploadedImage[] | null>()

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



  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 16, gap: 12, paddingBottom: bottom }}>
        <StyledEventImagePicker onPress={pickImage}>
          {image ?
            <Image style={{ flex: 1, width: "100%" }} source={{ uri: image[0].uri }} />
            :
            <P>+ Add images</P>
          }
        </StyledEventImagePicker>
        <PrimaryFormInput label={t("eventName")} placeholder='Cool event' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("title", value)} />
        <PrimaryFormInput label={t("eventDescription")} style={{ minHeight: 90 }} multiline={true} placeholder='Descritpion' inputStyle='Primary' onChangeText={(value) => handleChangeFormValue("description", value)} />
        <View style={{ gap: 6 }}>
          <Span>Pick start/end time</Span>
          <View style={{ flexDirection: "row", gap: 8 }}>
            <View style={{ flex: 0.5 }}>
              <PrimaryDatePicker mode="datetime" display='calendar' placeholder={t("startTime")} minimumDate={new Date} initialValue={new Date} value={eventFormValues.startTime || new Date} onChange={(value) => setFiltersDateValues("startTime", value.nativeEvent.timestamp)} />
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
            style={{ gap: 6 }}
            ListHeaderComponent={
              <TouchableOpacity onPress={() => navigation.navigate("CreateTicketModal", {ticket: undefined})}>
                <StyledTicket style={{ alignItems: "center", justifyContent: "center" }}>
                  <P textcolor='Primary'>+ Create ticket</P>
                </StyledTicket>
              </TouchableOpacity>
            }
            renderItem={({ item }) => (
              <StyledTicket>
                <H6>{item.name}</H6>
                <P textcolor='Grey'>{item.description}</P>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <P>{item.amount}</P>
                  <P>{item.price}</P>
                </View>
              </StyledTicket>
            )}
          />
          
        </View>
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
        <PrimaryButton title={t("submit")} />
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

const StyledTicket = styled(View)`
  border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
  width: 200px;
  height: 120px;
  gap: 6px;
  padding: 8px;
  border-radius: 16px;
`