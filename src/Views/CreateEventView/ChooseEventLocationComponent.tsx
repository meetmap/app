import React, { useEffect, useRef } from 'react'
import { StyledCreateEventFormContainer } from '.'
import { P, Span } from '../../shared/Text'
import { Image, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../types/NavigationProps'
import MapView from 'react-native-maps'
import { useAppSelector } from '../../store/hooks'
import styled from 'styled-components'

const ChooseEventLocationComponent = () => {
    const navigation = useNavigation<NavigationProps>()
    const { eventFormValues } = useAppSelector(state => state.createEventFormSlice)
    const coords = useAppSelector(state => state.locationSlice.userCoordinates)
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

    return (
        <StyledCreateEventFormContainer>
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
        </StyledCreateEventFormContainer>
    )
}

export default ChooseEventLocationComponent

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

const StyledPinImage = styled(Image)`
      /* top: -50%;
      left: 50%; */
      top: -20px;
      width: 40px;
      height: 40px;
`
