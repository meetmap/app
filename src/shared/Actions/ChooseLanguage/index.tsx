import { ActionSheetIOS, Alert } from "react-native";
import { trigger } from "react-native-haptic-feedback";
import i18next, { t } from "i18next";

const ChooseLanguage = () => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), "English", "Русский"],
            cancelButtonIndex: 0,
        },
        async buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                i18next.changeLanguage("en")
            } else if (buttonIndex === 2) {
                i18next.changeLanguage("ru")
            }
        },
    );
}

export default ChooseLanguage