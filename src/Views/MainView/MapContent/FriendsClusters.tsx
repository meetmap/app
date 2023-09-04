import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { getUpdatedFriendsLocationThunk } from '@src/store/slices/locationSlice';
import FriendMarker from './FriendMarker';
import { useNetInfo } from '@react-native-community/netinfo';

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
