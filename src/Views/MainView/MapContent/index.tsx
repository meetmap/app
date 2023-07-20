import { LegacyRef, RefObject, useEffect, useRef, useState } from "react";
import { Alert, Linking, PermissionsAndroid, Platform, Text, ToastAndroid, View } from "react-native"
import MapView, { Details, Marker, Region } from "react-native-maps"
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import useLocation from "../../../hooks/useLocation";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAddressState } from "../../../store/slices/mapSlice";

const MapContent = () => {
    const { userCoordinates } = useAppSelector(state => state.locationSlice)
    // type Camera = {
    //     center: {
    //        latitude: number,
    //        longitude: number,
    //    },
    //    pitch: number,
    //    heading: number,

    //    // Only on iOS MapKit, in meters. The property is ignored by Google Maps.
    //    altitude: number,

    //    // Only when using Google Maps.
    //    zoom: number
    // }
    const [location, setLocation] = useState()
    // const { getLocation } = useLocation()
    // useEffect(() => {
    //     const location =  getLocation()

    // }, [third])

    const initialRegion = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const dispatch = useAppDispatch()
    const mapRef = useRef<MapView>(null)
    const handleRegionChangeComplete = async (region: Region, details: Details) => {
        const data = await mapRef.current?.addressForCoordinate({latitude: region.latitude, longitude: region.longitude})
        dispatch(setAddressState(data))
    };


    return (
        <MapView
            ref={mapRef}
            style={{ flex: 1 }}
            showsCompass={false}
            // initialRegion={{
            //     latitude: userCoordinates?.lat || 0,
            //     longitude: userCoordinates?.lng || 0,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // }}

            userInterfaceStyle={"light"}
            showsPointsOfInterest={false}
            onRegionChangeComplete={handleRegionChangeComplete}
        >

            {/* <Marker>
                <View style={{ backgroundColor: "red", padding: 10 }}>
                    <Text>SF</Text>
                </View>
            </Marker> */}
            {/* <EventsClusters clusters={clusters}/> */}
        </MapView >
    )

}

export default MapContent
