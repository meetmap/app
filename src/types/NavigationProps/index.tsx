import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {

    WelcomeView: undefined;

    LoginView: undefined;

    RegisterView: undefined;

    MainView: undefined;

    EventModalView: { eventCid: string }

    EventsListModalView: { eventCids: string[] }

    UsersListModalView: { userCId: string, username: string }

    InviteFriendsModalView: { eventCid: string }

    ProfileView: { userCid: string  }

    SettingsView: undefined

    FavoriteTagsView: undefined

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

    MyBottomSheet: undefined

    PublishMessageView: undefined
};


export type NavigationProps = StackNavigationProp<RootStackParamList>