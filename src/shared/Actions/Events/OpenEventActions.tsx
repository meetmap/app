import { ActionSheetIOS } from "react-native";
import { IEvent } from "../../../types/event";
import { flyTo } from "../../../hooks/useFlyTo";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../../../types/NavigationProps";

const OpenEventActions = (eventData: IEvent) => {
  const navigation = useNavigation<NavigationProps>();
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
        flyTo(eventData.location.coordinates.coordinates[1], eventData.location.coordinates.coordinates[0])
        navigation.navigate("EventModalView", { eventId: eventData.id })
      }
    },
  );
}

export default OpenEventActions