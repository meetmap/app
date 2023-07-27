import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {

    WelcomeView: undefined;

    LoginView: undefined;

    RegisterView: undefined;

    MainView: undefined;

    EventModalView: { eventId: string }

    EventsListModalView : { eventIds: string[] }

    UsersListModalView : { userCId: string, username: string }

    MyBottomSheet: undefined

    ProfileView: { userId: string, username: string }; // a screen that we are 
    // navigating to, in the current screen,
    // that we should pass a prop named `slug` to it
    SettingsView: undefined

    FilterModalView: undefined;

    SelfProfileView: undefined;
};


export type NavigationProps = StackNavigationProp<RootStackParamList>