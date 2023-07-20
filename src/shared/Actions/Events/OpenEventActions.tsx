import { ActionSheetIOS } from "react-native";
import { IEvent } from "../../../types/event";

const OpenEventActions = (eventData: IEvent) => {

  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Share', 'See on map'],
      cancelButtonIndex: 0,
      userInterfaceStyle: 'dark',
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        // cancel action
      } else if (buttonIndex === 1) {

      } else if (buttonIndex === 2) {

      }
    },
  );
}

export default OpenEventActions