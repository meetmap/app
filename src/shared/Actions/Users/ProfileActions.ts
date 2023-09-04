import { ActionSheetIOS } from "react-native";
import { IPartialUser } from "@src/types/users";
import { flyToUser } from "@src/hooks/Map/flyToUser";
import { RootStackParamList } from "@src/types/NavigationProps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { trigger } from "react-native-haptic-feedback";
import { t } from "i18next";
import { ICoordinates } from "@src/types/location";

const ProfileActions = (userData: IPartialUser, flyTo: (_coordinates: ICoordinates) => Promise<void>,  navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>) => {
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
                // empty
            } else if (buttonIndex === 2) {
                flyToUser(userData.cid, flyTo, navigation)
            } 
        },
    );
}

export default ProfileActions