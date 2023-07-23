import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Button, SafeAreaView, Text, View } from 'react-native';
import { RootStackParamList } from '../../types/NavigationProps';
import LikeButton from '../../shared/Buttons/LikeButton';
import styled from 'styled-components/native';
import BottomControlls from './BottomControlls';
import MapContent from './MapContent';
import useLocation from '../../hooks/useLocation';
import MapHeader from './MapHeader';
import BackgroundGeolocation, { Subscription } from 'react-native-background-geolocation';
import { useAppDispatch } from '../../store/hooks';
import { updateUserLocationThunk } from '../../store/slices/locationSlice';

export interface IMainViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainView'>;
}

const MainView = ({ navigation }: IMainViewProps) => {
  const [enabled, setEnabled] = React.useState(false);
  // const [location, setLocation] = React.useState('');
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation((location) => {
      console.log('[onLocation]', location);
      if (location) {
        dispatch(
          updateUserLocationThunk({
            lat: location.coords?.latitude,
            lng: location.coords?.longitude,
          }),
        );
      }
      // setLocation(JSON.stringify(location, null, 2));
    })

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange((event) => {
      console.log('[onMotionChange]', event);
    });

    const onActivityChange: Subscription = BackgroundGeolocation.onActivityChange((event) => {
      console.log('[onActivityChange]', event);
    })

    const onProviderChange: Subscription = BackgroundGeolocation.onProviderChange((event) => {
      console.log('[onProviderChange]', event);
    })

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config


      // url: 'http://yourserver.com/locations',
      batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
      // headers: {              // <-- Optional HTTP headers
      //   "X-FOO": "bar"
      // },
      // params: {               // <-- Optional HTTP params
      //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      // }

    }).then((state) => {
      setEnabled(true)
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    }
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
    }
  }, [enabled]);

  // useEffect(() => {
  //   console.log(location)
  // }, [location])


  return (
    <StyledMainPageContainer>
      <MapContent />
      <MapHeader />
      <BottomControlls navigation={navigation} />
    </StyledMainPageContainer>
  );
};

export default MainView;

const StyledMainPageContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* background: linear-gradient(180deg, #0066FF 0%, rgba(148, 216, 255, 0) 25%); */
`;
