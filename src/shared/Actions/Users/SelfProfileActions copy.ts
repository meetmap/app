import { ActionSheetIOS, Alert } from "react-native";
import { IPartialUser, IUserSelf } from "../../../types/users";
import { flyTo } from "../../../hooks/Map/useFlyTo";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "../../../hooks/Map/flyToUser";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { NavigationProps } from "../../../types/NavigationProps";
import { trigger } from "react-native-haptic-feedback";

const SelfProfileActions = (userData: IUserSelf) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Share profile'],
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {

            }
        },
    );
}

export default SelfProfileActions