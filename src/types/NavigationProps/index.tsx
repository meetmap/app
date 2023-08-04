import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {

    WelcomeView: undefined;

    LoginView: undefined;

    RegisterView: undefined;

    MainView: undefined;

    EventModalView: { eventId: string }

    EventsListModalView: { eventIds: string[] }

    UsersListModalView: { userCId: string, username: string }

    InviteFriendsModalView: { eventId: string }

    MyBottomSheet: { eventId: string }

    ProfileView: { userId: string, username: string }; // a screen that we are 
    // navigating to, in the current screen,
    // that we should pass a prop named `slug` to it
    SettingsView: undefined

    ReportAProblemView: undefined

    ChooseLanguageView: undefined

    FilterModalView: undefined;

    SelfProfileView: undefined;

    CreateEventView: undefined;
};


export type NavigationProps = StackNavigationProp<RootStackParamList>