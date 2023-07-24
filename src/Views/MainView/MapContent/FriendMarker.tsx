import React, { useEffect, useState } from 'react'
import { AnimatedRegion, Marker } from 'react-native-maps'
import { GetFriendsLocationResponse } from '../../../api/location'
import FriendPin from '../../../shared/Pins/FriendPin'

const FriendMarker = ({ friend }: { friend: GetFriendsLocationResponse }) => {
    const [coordinate, setCoordinate] = useState<AnimatedRegion | null>(null);
    useEffect(() => {
        if (friend.location) {
            const reg = new AnimatedRegion({
                latitude: friend.location.lat,
                longitude: friend.location.lng,
                latitudeDelta: 0,
                longitudeDelta: 0,
            })
            setCoordinate(reg)
        }
    }, [!!friend.location])

    useEffect(() => {
        animateMarker();
    }, [friend.location]);


    const animateMarker = () => {
        if (coordinate) {
            coordinate.timing({
                latitude: friend.location.lat,
                longitude: friend.location.lng,
                useNativeDriver: false,
                toValue: 0,
                duration: 3000,
                latitudeDelta: 0,
                longitudeDelta: 0
            }).start();
        }
    }
    return (
        <Marker.Animated
            key={friend.id}
            // entering={FadeIn}
            coordinate={coordinate as any}
        >
            <FriendPin
                userData={friend}
                profilePicture={friend.profilePicture}
            />
        </Marker.Animated>
    )
}

export default FriendMarker