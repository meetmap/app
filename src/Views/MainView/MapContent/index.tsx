import MapView, { Details, Marker, Region } from 'react-native-maps';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getAddressThunk, setAddressState } from '../../../store/slices/mapSlice';
import UserMarker from './UserMarker';
import { useMap } from '../../../hooks/MapProvider';
import { debounce } from 'lodash';
import EventsClusters from './EventsClusters';
import FriendsClusters from './FriendsClusters';
import useEventsOnMap from '../../../hooks/useEventsOnMap';
import { useEffect } from 'react';

const MapContent = () => {
  const { mapViewRef } = useMap();
  const { userCoordinates } = useAppSelector(state => state.locationSlice);

  const dispatch = useAppDispatch();

  const { clusters, getEventsByCoordinates, clusterizeEvents, changeZoomLevel } = useEventsOnMap()

  useEffect(() => {
    if (mapViewRef.current && userCoordinates) {
      dispatch(getAddressThunk({
        mapView: mapViewRef.current,
        latitude: userCoordinates.lat,
        longitude: userCoordinates.lng,
      }))
    }
  }, [!!userCoordinates])
  

  const handleRegionChangeComplete = async (
    region: Region,
    details: Details,
  ) => {
    getEventsByCoordinates(region)

    if (mapViewRef.current) {
      dispatch(getAddressThunk({
        mapView: mapViewRef.current,
        latitude: region.latitude,
        longitude: region.longitude,
      }))
    }
    // const data = await mapViewRef.current?.addressForCoordinate({
    //   latitude: region.latitude,
    //   longitude: region.longitude,
    // });
    // dispatch(setAddressState(data));

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
      zoomControlEnabled
    >
      <EventsClusters clusters={clusters} />
      <FriendsClusters />
      <UserMarker />
    </MapView>
  );
};

export default MapContent;
