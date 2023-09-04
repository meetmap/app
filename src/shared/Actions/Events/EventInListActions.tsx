import { IEvent } from "@src/types/event"
import { ActionSheetIOS } from "react-native";
import { trigger } from "react-native-haptic-feedback";
import { ICoordinates } from "@src/types/location";
import { NavigationProps } from "@src/types/NavigationProps";
import { t } from "i18next";

const EventInListActions = (eventData: IEvent, flyTo: (_coordinates: ICoordinates) => Promise<void>, navigation: NavigationProps) => {
  trigger("impactLight");
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: [t("cancel"), t("share"), t("seeOnMap"), t("inviteFriend")],
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
      } else if (buttonIndex === 3) {
        navigation.navigate("InviteFriendsModalView", {eventCid: eventData.cid})
      }
    },
  );
}

export default EventInListActions