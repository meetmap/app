import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Marker } from 'react-native-maps';
import { getUpdatedFriendsLocationThunk } from '../../../store/slices/locationSlice';
import FriendPin from '../../../shared/Pins/FriendPin';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

const UsersClusters = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUpdatedFriendsLocationThunk());
    const intervalId = setInterval(() => {
      dispatch(getUpdatedFriendsLocationThunk());
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const { friendsCoordinates } = useAppSelector(state => state.locationSlice);
  const mapFiler = useAppSelector(state => state.mapSlice.mapFilters);
  if (mapFiler === 'Friends' || mapFiler === 'All') {
    return (
      friendsCoordinates.map(friend => (
        <AnimatedMarker
          entering={FadeIn}
          key={friend.id}
          coordinate={{
            latitude: friend.location.lat,
            longitude: friend.location.lng,
          }}
        >
          <FriendPin
            userData={friend}
            profilePicture={friend.profilePicture}
          />
        </AnimatedMarker>
      ))

    );
  }
  return null;
};

export default UsersClusters;
