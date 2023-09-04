import { ActionSheetIOS } from "react-native";
import { IEvent } from "@src/types/event";
import { NavigationProps } from "@src/types/NavigationProps";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "@src/types/location";
import { t } from "i18next";

const OpenEventActions = (eventData: IEvent, flyTo: (_coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps) => {
  trigger("impactLight");
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [t("cancel"), t("share"), t("seeOnMap")],
      cancelButtonIndex: 0,
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
        //empty
      } else if (buttonIndex === 2) {
        navigation.navigate("MainView")
        flyTo({lat: eventData.location.coordinates.coordinates[1], lng: eventData.location.coordinates.coordinates[0]})
      }
    },
  );
}

export default OpenEventActions