import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { Marker } from 'react-native-maps';
import { getUpdatedFriendsLocationThunk } from '../../../store/slices/locationSlice';
import FriendPin from '../../../shared/Pins/FriendPin';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import FriendMarker from './FriendMarker';
import { useNetInfo } from '@react-native-community/netinfo';
import AppError from '../../../utils/AppError';

const FriendsClusters = () => {
  const dispatch = useAppDispatch();
  const netInfo = useNetInfo();
  useEffect(() => {
    if (!netInfo.isConnected) {
      return;
    }
    dispatch(getUpdatedFriendsLocationThunk());
    const intervalId = setInterval(() => {
      dispatch(getUpdatedFriendsLocationThunk());
    }, 3000);

    return () => clearInterval(intervalId);
  }, [netInfo.isConnected]);

  const { friendsCoordinates } = useAppSelector(state => state.locationSlice);

  const mapFiler = useAppSelector(state => state.mapSlice.mapFilters);

  if (mapFiler === 'Friends' || mapFiler === 'All') {
    return (
      <>
        {friendsCoordinates.map(friend => {
          if (friend.location) {
            return <FriendMarker key={friend.id} friend={friend} />;
          }
          return null;
        })}
      </>
    );
  }
  return null;
};

export default FriendsClusters;
