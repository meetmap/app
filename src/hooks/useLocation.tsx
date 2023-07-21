import { useEffect, useRef, useState } from "react";
import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native"
import Geolocation, { GeoPosition } from 'react-native-geolocation-service';
import { useAppDispatch } from "../store/hooks";
import { updateUserLocationThunk } from "../store/slices/locationSlice";
import { ICoordinates } from "../types/location";

const useLocation = () => {
    const [forceLocation, setForceLocation] = useState(true);
    const [highAccuracy, setHighAccuracy] = useState(true);
    const [locationDialog, setLocationDialog] = useState(true);
    const [significantChanges, setSignificantChanges] = useState(false);
    const [observing, setObserving] = useState(false);
    const [foregroundService, setForegroundService] = useState(false);
    const [useLocationManager, setUseLocationManager] = useState(false);
    // const [location, setLocation] = useState<GeoPosition | null>(null);

    const dispatch = useAppDispatch()

    const watchId = useRef<number | null>(null);

    const stopLocationUpdates = () => {
        // if (Platform.OS === 'android') {
        //   VIForegroundService.getInstance()
        //     .stopService()
        //     .catch((err: any) => err);
        // }

        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            watchId.current = null;
            setObserving(false);
        }
    };

    useEffect(() => {
        return () => {
            console.log('aaaa')
            stopLocationUpdates();
        };
    }, []);

    const hasPermissionIOS = async () => {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow meetmap to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    const getLocation = async () => {
        const hasPermission = await hasLocationPermission();

        if (!hasPermission) {
            return null;
        }

        Geolocation.getCurrentPosition(
            position => {
                dispatch(updateUserLocationThunk({ lat: position.coords.latitude, lng: position.coords.longitude }));
                // return {lat: position.coords.latitude, lng: position.coords.longitude}
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
                // setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
            },
        );
    };

    const getLocationUpdates = async () => {
        const hasPermission = await hasLocationPermission();

        if (watchId.current) {
            return
        }
        if (!hasPermission) {
            return;
        }

        if (Platform.OS === 'android' && foregroundService) {
            await startForegroundService();
        }

        setObserving(true);

        watchId.current = Geolocation.watchPosition(
            position => {
                dispatch(updateUserLocationThunk({ lat: position.coords.latitude, lng: position.coords.longitude }));
                // console.log("pos", position);
            },
            error => {
                // setLocation(null);
                console.log(error);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: highAccuracy,
                distanceFilter: 0,
                interval: 5000,
                fastestInterval: 2000,
                forceRequestLocation: forceLocation,
                forceLocationManager: useLocationManager,
                showLocationDialog: locationDialog,
                useSignificantChanges: significantChanges,
            },
        );
    };

    const startForegroundService = async () => {
        //android only
        // if (Platform.Version >= 26) {
        //   await VIForegroundService.getInstance().createNotificationChannel({
        //     id: 'locationChannel',
        //     name: 'Location Tracking Channel',
        //     description: 'Tracks location of user',
        //     enableVibration: false,
        //   });
        // }
        // return VIForegroundService.getInstance().startService({
        //   channelId: 'locationChannel',
        //   id: 420,
        //   title: appConfig.displayName,
        //   text: 'Tracking location updates',
        //   icon: 'ic_launcher',
        // });
    };

    return {
        getLocation,
        getLocationUpdates
    }
}

export default useLocation