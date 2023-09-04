import { ActionSheetIOS } from "react-native";
import { IPartialUser } from "@src/types/users";
import ConfirmAlert from "../../Alerts/ConfirmAlert";
import { flyToUser } from "@src/hooks/Map/flyToUser";
import { NavigationProps } from "@src/types/NavigationProps";
import { trigger } from "react-native-haptic-feedback";
import { t } from "i18next";
import { ICoordinates } from "@src/types/location";

const UserInListActions = (userData: IPartialUser, handleChangeFriendshipStatus: () => Promise<void>, flyTo: (_coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), t("removeFromFriends"), t("shareProfile"), t("disableGeolocation"), t("seeOnMap")],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                ConfirmAlert(handleChangeFriendshipStatus, "Are you sure?", `Do you really want to remove ${userData.name || userData.username} from your friends list`)
            } else if (buttonIndex === 2) {
                /* empty */
            } else if (buttonIndex === 3) {
                /* empty */
            } else if (buttonIndex === 4) {
                flyToUser(userData.cid, flyTo, navigation)
            }
        },
    );
}

export default UserInListActions