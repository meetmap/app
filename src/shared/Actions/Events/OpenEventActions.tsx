import { ActionSheetIOS } from "react-native";
import { IEvent } from "../../../types/event";
import { flyTo } from "../../../hooks/useFlyTo";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../types/NavigationProps";
import { RefObject } from "react";
import MapView from "react-native-maps";

const OpenEventActions = (eventData: IEvent, mapViewRef: RefObject<MapView>, navigation: NavigationProps) => {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Share', 'See on map'],
      cancelButtonIndex: 0,
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {
      } else if (buttonIndex === 2) {
        navigation.navigate("MainView")
        flyTo(eventData.location.coordinates.coordinates[1], eventData.location.coordinates.coordinates[0], mapViewRef)
      }
    },
  );
}

export default OpenEventActions