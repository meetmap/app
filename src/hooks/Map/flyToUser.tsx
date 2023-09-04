import { getUpdatedFriendsLocation } from "@src/api/location";
import { NavigationProps, RootStackParamList } from "@src/types/NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICoordinates } from "@src/types/location";

export const flyToUser = async (userCid: string, flyTo: (_coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps | NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
    const friendsLocations = await getUpdatedFriendsLocation()
    const userLocation = friendsLocations.find(user => user.cid === userCid)
    if (userLocation) {
        navigation.navigate("MainView")
        flyTo({lat: userLocation.location.lat, lng: userLocation.location.lng})
    }
}