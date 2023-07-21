import React, { useEffect } from 'react'
import { useAppSelector } from '../../../store/hooks'
import { Marker } from 'react-native-maps'
import { useMap } from '../../../hooks/MapProvider';
import UserPin from '../../../shared/Pins/UserPin';

const UserMarker = () => {
    const { mapViewRef } = useMap();
    const userLocation = useAppSelector(state => state.locationSlice.userCoordinates)
    const userData = useAppSelector(state => state.userSlice.user?.profilePicture)
    useEffect(() => {
        if (userLocation) {
            mapViewRef?.current?.animateToRegion({
                latitude: userLocation.lat,
                longitude: userLocation.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
    }, [!!userLocation])

    if (userLocation) {
        return (
            <Marker coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lng
            }}
            >
                <UserPin profilePicture={userData} />
            </Marker>
        )
    }
    return null
}

export default UserMarker