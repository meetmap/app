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

    ProfileView: { userId: string, username: string }

    SettingsView: undefined

    ReportAProblemView: undefined

    ChooseLanguageView: undefined

    FilterModalView: undefined;

    SearchModalView: undefined;

    SelfProfileView: undefined;

    FriendsModalView: undefined;
    
    CreateEventView: undefined;
};


export type NavigationProps = StackNavigationProp<RootStackParamList>