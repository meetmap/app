import { useNavigation } from "@react-navigation/native";
import { getUpdatedFriendsLocation } from "../../api/location";
import { NavigationProps, RootStackParamList } from "../../types/NavigationProps";
import { useMap } from "../MapProvider";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICoordinates } from "../../types/location";

export const flyToUser = async (userCid: string, flyTo: (coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps | NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
    const friendsLocations = await getUpdatedFriendsLocation()
    const userLocation = friendsLocations.find(user => user.cid === userCid)
    if (userLocation) {
        navigation.navigate("MainView")
        flyTo({lat: userLocation.location.lat, lng: userLocation.location.lng})
    }
}