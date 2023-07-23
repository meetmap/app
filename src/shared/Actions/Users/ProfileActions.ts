import { ActionSheetIOS, Alert } from "react-native";
import { IPartialUser, IUserSelf } from "../../../types/users";
import { flyTo } from "../../../hooks/useFlyTo";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "../../../hooks/flyToUser";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NavigationProps, RootStackParamList } from "../../../types/NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trigger } from "react-native-haptic-feedback";

const ProfileActions = (userData: IPartialUser,  mapViewRef: RefObject<MapView>, navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Share profile', "See on map"],
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {

            } else if (buttonIndex === 2) {
                flyToUser(userData.cid, mapViewRef, navigation)
            } 
        },
    );
}

export default ProfileActions