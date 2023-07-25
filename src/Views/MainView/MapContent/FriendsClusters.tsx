import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {Marker} from 'react-native-maps';
import {getUpdatedFriendsLocationThunk} from '../../../store/slices/locationSlice';
import FriendPin from '../../../shared/Pins/FriendPin';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import FriendMarker from './FriendMarker';

// const AnimatedMarker = Animated.createAnimatedComponent(Marker);

const FriendsClusters = () => {
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
