import React, { useEffect, useState } from 'react'
import { useAppSelector } from '@src/store/hooks'
import { AnimatedRegion, Marker } from 'react-native-maps'
import { useMap } from '@src/hooks/MapProvider';
import UserPin from '@src/shared/Pins/UserPin';

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
            const reg = new AnimatedRegion({
                latitude: userLocation.lat,
                longitude: userLocation.lng,
                latitudeDelta: 0,
                longitudeDelta: 0,
            })
            setCoordinate(reg)
        }
    }, [!!userLocation])

    const [coordinate, setCoordinate] = useState<AnimatedRegion | null>(null);

    useEffect(() => {
        animateMarker();
    }, [userLocation]);


    const animateMarker = () => {
        if (userLocation && coordinate) {
            coordinate.timing({
                latitude: userLocation.lat,
                longitude: userLocation.lng,
                useNativeDriver: false,
                toValue: 0,
                duration: 2000,
                latitudeDelta: 0,
                longitudeDelta: 0
            }).start();
        }
    };

    if (userLocation && coordinate) {
        return (
            <Marker.Animated
                style={{ zIndex: 1 }}
                coordinate={coordinate as any}
            >
                <UserPin profilePicture={userData} />
            </Marker.Animated>
        )
    }
    return null
}

export default UserMarker