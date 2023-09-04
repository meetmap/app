import { t } from 'i18next';
import { Dispatch, SetStateAction} from 'react'
import { ActionSheetIOS } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';

const ChooseFrendsListType = (setFriendListType: Dispatch<SetStateAction<string>>) => {
    trigger("impactLight");
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: [t("cancel"), t("outcomingRequests"), t("incomingRequests"), t("friends")],
            cancelButtonIndex: 0,
        },
        buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
                setFriendListType('outcomingRequests')
            } else if (buttonIndex === 2) {
                setFriendListType('incomingRequests')
            } else if (buttonIndex === 3) {
                setFriendListType('friends')
            }
        },
    );
}

export default ChooseFrendsListType