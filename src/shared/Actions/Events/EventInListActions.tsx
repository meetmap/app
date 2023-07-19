import { Dispatch, SetStateAction } from "react"
import { IEvent } from "../../../types/event"
import { ActionSheetIOS } from "react-native";

const EventInListActions = ({ isOpen, setIsOpen, title, eventData }: {
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  title: string,
  eventData: IEvent
}) => {
  // const flyTo = useFlyTo(eventData.location.coordinates.coordinates[0], eventData.location.coordinates.coordinates[1])

  // const dispatch = useAppDispatch()
  // const history = useHistory()
  // const flyToF = () => {
  //   if (location.pathname !== '/') {
  //     history.push('/');
  //   }

  //   dispatch(setIsOpenedEventModal(false))
  //   dispatch(setIsOpenedSearchModal(false))
  //   flyTo()
  // }
  // return (
  //   <IonActionSheet isOpen={isOpen}
  //     header={title}
  //     buttons={[
  //       {
  //         text: 'Invite friend',
  //         handler: () => flyToF(),
  //       },
  //       {
  //         text: 'Share',
  //         // handler: () => handleActionSheetDidDismiss('share'),
  //       },
  //       {
  //         text: 'See on map',
  //         handler: () => flyToF(),
  //         // handler: () => handleActionSheetDidDismiss('flyTo'),
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         // handler: () => handleActionSheetDidDismiss('cancel'),
  //       },
  //     ]}
  //     onDidDismiss={() => setIsOpen(false)}
  //   />
  ActionSheetIOS.showActionSheetWithOptions(
    {
      options: ['Cancel', 'Share', 'See on map', 'Invite friend'],
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

export default EventInListActions