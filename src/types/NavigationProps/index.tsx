import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { ITicket } from "../event";

export type RootStackParamList = {

    WelcomeView: undefined;

    LoginView: undefined;

    RegisterView: undefined;

    MainView: undefined;

    EventModalView: { eventCid: string }

    EventsListModalView: { eventCids: string[] }

    UsersListModalView: { userCId: string, username: string }

    InviteFriendsModalView: { eventCid: string }

    ProfileView: { userId: string, username: string }

    SettingsView: undefined

    ReportAProblemView: undefined

    ChooseLanguageView: undefined

    FilterModalView: undefined;

    SearchModalView: undefined;

    SelfProfileView: undefined;

    FriendsModalView: undefined;
    
    CreateEventView: undefined;

    ChooseLocationView: undefined;

    CreateTicketModal: {ticketIndex?: number};

    WhoWillGoModalView: {eventCid: string}

    EventLikesModalView: {eventCid: string}
};


export type NavigationProps = StackNavigationProp<RootStackParamList>