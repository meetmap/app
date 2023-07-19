import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {

    WelcomeView: undefined;

    LoginView: undefined;

    RegisterView: undefined;

    MainView: undefined;

    ProfileView: { name: string; }; // a screen that we are 
    // navigating to, in the current screen,
    // that we should pass a prop named `slug` to it

    FilterModalView: undefined;

    SelfProfileView: undefined;

    ScreenThree: { data: Array<string> };

    ScreenFour: undefined;
};
