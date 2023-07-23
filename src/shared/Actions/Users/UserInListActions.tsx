import { ActionSheetIOS, Alert } from "react-native";
import { IPartialUser } from "../../../types/users";
import { flyTo } from "../../../hooks/useFlyTo";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "../../../hooks/flyToUser";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NavigationProps } from "../../../types/NavigationProps";
import { trigger } from "react-native-haptic-feedback";

const UserInListActions = (userData: IPartialUser, handleChangeFriendshipStatus: () => Promise<void>, mapViewRef: RefObject<MapView>, navigation: NavigationProps) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Remove from friends', 'Share profile', 'Disable geolocation', 'See on map'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
               ConfirmAlert(handleChangeFriendshipStatus, "Are you sure?" ,`Do you really want to remove ${userData.name || userData.username} from your friends list`)
            } else if (buttonIndex === 2) {
            } else if (buttonIndex === 3) {
            }else if (buttonIndex === 4) {
                flyToUser(userData.cid, mapViewRef, navigation)
            }
        },
    );
}

export default UserInListActions