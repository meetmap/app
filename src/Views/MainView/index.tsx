import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '@src/types/NavigationProps';
import styled from 'styled-components/native';
import BottomControlls from './BottomControlls';
import MapContent from './MapContent';
import MapHeader from './MapHeader';
import BackgroundGeolocation, {
  Subscription,
} from 'react-native-background-geolocation';
import {useAppDispatch, useAppSelector} from '@src/store/hooks';
import {updateUserLocationThunk} from '@src/store/slices/locationSlice';

interface IMainViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainView'>;
}

export const MainView = ({navigation}: IMainViewProps) => {
  const [enabled, setEnabled] = React.useState(false);
  // const [location, setLocation] = React.useState('');
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.userSlice.user);
  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      location => {
        if (location) {
          dispatch(
            updateUserLocationThunk({
              lat: location.coords?.latitude,
              lng: location.coords?.longitude,
            }),
          );
        }
        // setLocation(JSON.stringify(location, null, 2));
      },
    );

    const onMotionChange: Subscription = BackgroundGeolocation.onMotionChange(
      event => {
        console.log('[onMotionChange]', event);
      },
    );

    const onActivityChange: Subscription =
      BackgroundGeolocation.onActivityChange(event => {
        console.log('[onActivityChange]', event);
      });

    const onProviderChange: Subscription =
      BackgroundGeolocation.onProviderChange(event => {
        console.log('[onProviderChange]', event);
      });

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 30,
      elasticityMultiplier: 3,
      // Activity Recognition
      stopTimeout: 5,
      // useSignificantChangesOnly: true,
      showsBackgroundLocationIndicator: false,
      // Application config
      // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config

      // url: 'http://yourserver.com/locations',
      batchSync: false, // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
      autoSync: true, // <-- [Default: true] Set true to sync each location to server as it arrives.
    }).then(state => {
      setEnabled(true);
      console.log(
        '- BackgroundGeolocation is configured and ready: ',
        state.enabled,
      );
    });

    return () => {
      // Remove BackgroundGeolocation event-subscribers when the View is removed or refreshed
      // during development live-reload.  Without this, event-listeners will accumulate with
      // each refresh during live-reload.
      onLocation.remove();
      onMotionChange.remove();
      onActivityChange.remove();
      onProviderChange.remove();
    };
  }, []);

  /// 3. start / stop BackgroundGeolocation
  React.useEffect(() => {
    if (enabled && userData) {
      BackgroundGeolocation.start();
    } else {
      BackgroundGeolocation.stop();
    }
  }, [enabled, !!userData]);

  return (
    <StyledMainPageContainer>
      <MapContent />
      <MapHeader />
      <BottomControlls navigation={navigation} />
    </StyledMainPageContainer>
  );
};

const StyledMainPageContainer = styled(View)`
  position: relative;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* background: linear-gradient(180deg, #0066FF 0%, rgba(148, 216, 255, 0) 25%); */
`;
