import { Dispatch, SetStateAction } from "react"
import { IEvent } from "../../../types/event"
import { ActionSheetIOS } from "react-native";
import { trigger } from "react-native-haptic-feedback";

const EventInListActions = ({ isOpen, setIsOpen, title, eventData }: {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  title: string,
  eventData: IEvent
}) => {
  trigger("impactLight");
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Share', 'See on map', 'Invite friend'],
      cancelButtonIndex: 0,
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

export default EventInListActions