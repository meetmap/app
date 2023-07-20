import { ActionSheetIOS } from "react-native";
import { IPartialUser } from "../../../types/users";

const UserInListActions = (userData: IPartialUser) => {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ['Cancel', 'Remove from friends', 'Share profile', 'Disable geolocation', 'See on map'],
            destructiveButtonIndex: 1,
            cancelButtonIndex: 0,
            userInterfaceStyle: 'dark',
        },
        buttonIndex => {
            if (buttonIndex === 0) {
                // cancel action
            } else if (buttonIndex === 1) {
            } else if (buttonIndex === 2) {
            } else if (buttonIndex === 3) {
            }
        },
    );
}

export default UserInListActions