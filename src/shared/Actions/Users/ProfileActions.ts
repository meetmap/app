import { ActionSheetIOS, Alert } from "react-native";
import { IPartialUser, IUserSelf } from "../../../types/users";
import { flyTo } from "../../../hooks/Map/useFlyTo";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "../../../hooks/Map/flyToUser";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NavigationProps, RootStackParamList } from "../../../types/NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "../../../types/location";
import { t } from "i18next";
const ProfileActions = (userData: IPartialUser, flyTo: (coordinates: ICoordinates) => Promise<void>,  navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), t("shareProfile"), t("seeOnMap")],
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {

            } else if (buttonIndex === 2) {
                flyToUser(userData.cid, flyTo, navigation)
            } 
        },
    );
}

export default ProfileActions