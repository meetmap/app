import { ActionSheetIOS } from "react-native";
import { IUserSelf } from "@src/types/users";
import { trigger } from "react-native-haptic-feedback";
import { t } from "i18next";

const SelfProfileActions = (userData: IUserSelf) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), t("shareProfile")],
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                console.log(userData)
                // cancel action
            } else if (buttonIndex === 1) {
                //empty
            }
        },
    );
}

export default SelfProfileActions