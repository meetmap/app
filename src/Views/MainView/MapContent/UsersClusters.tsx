import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {Marker} from 'react-native-maps';
import {getUpdatedFriendsLocationThunk} from '../../../store/slices/locationSlice';
import FriendPin from '../../../shared/Pins/FriendPin';

const UsersClusters = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUpdatedFriendsLocationThunk());
    const intervalId = setInterval(() => {
      dispatch(getUpdatedFriendsLocationThunk());
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const {friendsCoordinates} = useAppSelector(state => state.locationSlice);
  const mapFiler = useAppSelector(state => state.mapSlice.mapFilters);
  if (mapFiler === 'Friends' || mapFiler === 'All') {
    return (
      <>
        {friendsCoordinates.map(friend => (
          <Marker
            coordinate={{
              latitude: friend.location.lat,
              longitude: friend.location.lng,
            }}
            key={friend.id}>
            <FriendPin
              userData={friend}
              profilePicture={friend.profilePicture}
            />
          </Marker>
        ))}
      </>
    );
  }
  return null;
};

export default UsersClusters;
