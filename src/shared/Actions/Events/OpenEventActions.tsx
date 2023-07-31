import { ActionSheetIOS } from "react-native";
import { IEvent } from "../../../types/event";
import { flyTo } from "../../../hooks/Map/useFlyTo";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../types/NavigationProps";
import { RefObject } from "react";
import MapView from "react-native-maps";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "../../../types/location";
import { t } from "i18next";

const OpenEventActions = (eventData: IEvent, flyTo: (coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps) => {
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
      } else if (buttonIndex === 2) {
        navigation.navigate("MainView")
        flyTo({lat: eventData.location.coordinates.coordinates[1], lng: eventData.location.coordinates.coordinates[0]})
      }
    },
  );
}

export default OpenEventActions