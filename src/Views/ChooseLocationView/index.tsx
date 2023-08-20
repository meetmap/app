import React, { useRef, useState } from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import SearchInput from '../../shared/Input/SearchInput'
import MapView, { Address, Marker, Region } from 'react-native-maps'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { setEventFormValuesState } from '../../store/slices/createEventFormSlice'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../types/NavigationProps'
import { H2, H3 } from '../../shared/Text'

const ChooseLocationView = () => {
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
    const coords = useAppSelector(state => state.locationSlice.userCoordinates)
    const [choosedLocalCoords, setChoosedLocalCoords] = useState(eventFormValues.location)
    const [address, setAddress] = useState<Address | undefined>()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const navigaion = useNavigation<NavigationProps>()

    const miniMapRef = useRef<MapView>(null)

    const changeLocalCoords = async (region: Region) => {
        const { latitude, longitude } = region
        setChoosedLocalCoords({ lat: latitude, lng: longitude })
        const address = await miniMapRef.current?.addressForCoordinate({ latitude, longitude })
        setAddress(address)
    }
    const handleSubmitLocation = () => {
        dispatch(setEventFormValuesState({ ...eventFormValues, location: choosedLocalCoords }))
        navigaion.goBack()
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 16, gap: 12, flex: 1 }}>
                <SearchInput placeholder={t("search")}></SearchInput>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <MapView
                            ref={miniMapRef}
                            onRegionChangeComplete={changeLocalCoords}
                            initialRegion={{
                                latitude: eventFormValues.location?.lat || coords?.lat || 0,
                                longitude: eventFormValues.location?.lng || coords?.lng || 0,
                                latitudeDelta: 0.0222,
                                longitudeDelta: 0.0221,
                            }}
                            style={{ flex: 1, width: "100%", borderRadius: 20 }}
                        />
                        <StyledPinImage source={require('../../assets/LogoPin.png')} />
                    </View>
                    <StyledAddressView>
                        <H2 style={{textAlign: "center"}}>{address?.country}, {address?.administrativeArea}, {address?.name}</H2>
                    </StyledAddressView>
                </View>
                <PrimaryButton onPress={handleSubmitLocation} title={t("submit")} />
            </View>
        </SafeAreaView>
    )
}

export default ChooseLocationView

const StyledPinImage = styled(Image)`
  width: 40px;
  transform: translateY(-20px);
  height: 40px;
  position: absolute;
`
const StyledAddressView = styled(View)`
    top: 16px;
    left: 16px;
    right: 16px;
    position: absolute;
`