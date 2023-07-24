import { ActionSheetIOS, Alert } from "react-native";
import { IPartialUser } from "../../../types/users";
import { flyTo } from "../../../hooks/Map/useFlyTo";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "../../../hooks/Map/flyToUser";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NavigationProps } from "../../../types/NavigationProps";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "../../../types/location";

const UserInListActions = (userData: IPartialUser, handleChangeFriendshipStatus: () => Promise<void>, flyTo: (coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps) => {
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
                flyToUser(userData.cid, flyTo, navigation)
            }
        },
    );
}

export default UserInListActions