import {
  LegacyRef,
  RefObject,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import MapView, { Details, Marker, Region } from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setAddressState } from '../../../store/slices/mapSlice';
import UserMarker from './UserMarker';
import { useMap } from '../../../hooks/MapProvider';
import { debounce } from 'lodash';
import { Dimensions } from 'react-native';
import { getEventsByLocationThunk } from '../../../store/slices/eventsSlice';
import useSupercluster, { ClusterPoint } from '../../../hooks/useSuperCluster';
import EventsClusters from './EventsClusters';
import { IEvent } from '../../../types/event';
import { store } from '../../../store/store';
import FriendsClusters from './FriendsClusters';
import useEventsOnMap from '../../../hooks/useEventsOnMap';

const MapContent = () => {
  const { mapViewRef } = useMap();
  const { userCoordinates } = useAppSelector(state => state.locationSlice);

  const dispatch = useAppDispatch();

  const { clusters, getEventsByCoordinates, clusterizeEvents, changeZoomLevel } = useEventsOnMap()

  const handleRegionChangeComplete = async (
    region: Region,
    details: Details,
  ) => {
    getEventsByCoordinates(region)
    
    const data = await mapViewRef.current?.addressForCoordinate({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    dispatch(setAddressState(data));

  };

  const handleRegionChange = debounce(
    async (region: Region) => {
      changeZoomLevel(region)
      await clusterizeEvents()
    },
    200,
    { maxWait: 200 },
  );

  return (
    <MapView
      ref={mapViewRef}
      rotateEnabled={false}
      style={{ flex: 1 }}
      showsCompass={false}
      initialRegion={{
        latitude: userCoordinates?.lat || 0,
        longitude: userCoordinates?.lng || 0,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      }}
      userInterfaceStyle={'light'}
      showsPointsOfInterest={false}
      onRegionChange={handleRegionChange}
      onRegionChangeComplete={handleRegionChangeComplete}
    >
      <EventsClusters clusters={clusters} />
      <FriendsClusters />
      <UserMarker />
    </MapView>
  );
};

export default MapContent;
