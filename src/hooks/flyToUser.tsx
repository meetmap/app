import { useNavigation } from "@react-navigation/native";
import { getUpdatedFriendsLocation } from "../api/location";
import { NavigationProps, RootStackParamList } from "../types/NavigationProps";
import { useMap } from "./MapProvider";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const flyToUser = async (userCid: string, mapViewRef: RefObject<MapView>, navigation: NavigationProps | NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
    const friendsLocations = await getUpdatedFriendsLocation()
    const userLocation = friendsLocations.find(user => user.cid === userCid)
    if (userLocation) {
        navigation.navigate("MainView")
        mapViewRef.current?.animateToRegion({
            latitude: userLocation.location.lat,
            longitude: userLocation.location.lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        })
    }
}