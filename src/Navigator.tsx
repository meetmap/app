import React from 'react'
import { useAppSelector } from './store/hooks';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from '@src/Views/WelcomeView';
import LoginView from '@src/Views/LoginView';
import MainView from '@src/Views/MainView';
import ProfileView from '@src/Views/ProfileView';
import SelfProfileView from '@src/Views/SelfProfileView';
import FilterModalView from '@src/Views/FilterModalView';
import EventModalView from '@src/Views/EventModalView';
import WelcomeLoaderView from '@src/Views/WelcomeLoaderView';
import { TouchableOpacity } from 'react-native';
import SettingsIcon from '@src/shared/Icons/SettingsIcon';
import SettingsView from '@src/Views/SettingsView';
import EventsListModalView from '@src/Views/EventListModalView';
import UsersListModalView from '@src/Views/UsersListModalView';
import RegisterView from '@src/Views/RegisterView';
import ChooseLanguageView from '@src/Views/ChooseLanguageView';
import { useTranslation } from 'react-i18next';
import ReportAProblemView from '@src/Views/ReportAProblemView';
import CreateEventView from '@src/Views/CreateEventView';
import InviteFriendsModalView from '@src/Views/InviteFriendsModalView';
import FriendsModalView from '@src/Views/FriendsModalView';
import SearchModalView from '@src/Views/SearchModalView';
import EventLikesModalView from '@src/Views/EventLikesModalView';
import ChooseLocationView from '@src/Views/ChooseLocationView';
import CreateTicketModal from '@src/Views/CreateTicketModal';
import FavoriteTagsView from '@src/Views/FavoriteTagsView';
import PublishMessageView from '@src/Views/PublishMessageView';
import ChatView from '@src/Views/ChatView';


const Stack = createNativeStackNavigator();
const AppBottomSheetOptions: NativeStackNavigationOptions = {
    contentStyle: {
        backgroundColor: 'transparent'
    },
    headerShown: false,
    animation: "fade",
    presentation: "containedTransparentModal",
}
const Navigator = () => {
    const { user, isLoading } = useAppSelector((state) => state.userSlice);
    const { t } = useTranslation()
    return (
        <Stack.Navigator
            screenOptions={() => ({
                headerShadowVisible: false,
                cardStyle: { backgroundColor: '#fff' },
                // headerTransparent: true,
                contentStyle: {
                    backgroundColor: '#FFFFFF'
                },
                headerTintColor: "#7A7B84"
            })}
        >
            {!isLoading ?
                user ?
                    <Stack.Group >
                        <Stack.Screen name="MainView" component={MainView} options={{ headerShown: false }} />
                        <Stack.Screen
                            options={{ title: "", headerBackTitleVisible: false }}
                            name='EventModalView'
                            component={EventModalView}
                        />
                        <Stack.Screen options={{ title: "" }} name='EventsListModalView' component={EventsListModalView} />
                        <Stack.Screen options={AppBottomSheetOptions} name='FriendsModalView' component={FriendsModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='UsersListModalView' component={UsersListModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='InviteFriendsModalView' component={InviteFriendsModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventLikesModalView' component={EventLikesModalView} />
                        <Stack.Screen options={{ title: t("events") }} name='SearchModalView' component={SearchModalView} />
                        <Stack.Screen options={AppBottomSheetOptions} name='FilterModalView' component={FilterModalView} />
                        <Stack.Screen
                            name="ProfileView"
                            component={ProfileView}
                            options={() => ({
                                headerTitleStyle: {
                                    fontSize: 18,
                                    fontWeight: "900"
                                },
                                headerBackTitleVisible: false,
                                headerTitle: ""
                            })}
                        />
                        <Stack.Screen
                            options={({ navigation }) => ({
                                title: "",
                                headerRight: () => (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('SettingsView')}
                                    >
                                        <SettingsIcon />
                                    </TouchableOpacity>
                                ),

                            })}
                            name="SelfProfileView"
                            component={SelfProfileView}
                        />

                        <Stack.Screen options={{ title: "Pick fav tags" }} name={"FavoriteTagsView"} component={FavoriteTagsView} />
                        <Stack.Screen options={{ title: t("createEvent") }} name={"CreateEventView"} component={CreateEventView} />
                        <Stack.Screen options={{ presentation: "modal", title: t("chooseEventLocation") }} name={"ChooseLocationView"} component={ChooseLocationView} />
                        <Stack.Screen options={{
                            presentation: "transparentModal",
                            headerShown: false,
                            contentStyle: {
                                backgroundColor: 'transparent'
                            },
                            animation: "fade",
                            title: t("chooseEventLocation")
                        }} name={"CreateTicketModal"} component={CreateTicketModal} />

                        <Stack.Screen options={{ title: t("settings") }} name={"SettingsView"} component={SettingsView} />
                        <Stack.Screen
                            options={{
                                presentation: "transparentModal", headerShown: false,
                                contentStyle: {
                                    backgroundColor: 'transparent'
                                }
                            }}
                            name='ReportAProblemView'
                            component={ReportAProblemView}
                        />


                        <Stack.Screen options={{ title: t("chooseLanguage") }} name={"PublishMessageView"} component={PublishMessageView} />
                        <Stack.Screen options={AppBottomSheetOptions} name={"ChatView"} component={ChatView} />

                        <Stack.Screen options={{ title: t("chooseLanguage") }} name={"ChooseLanguageView"} component={ChooseLanguageView} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen
                            name="WelcomeView"
                            component={WelcomeView}
                            options={{
                                headerShown: false,
                                contentStyle: {
                                    backgroundColor: '#000000'
                                }
                            }}
                        />
                        <Stack.Screen
                            name="LoginView"
                            component={LoginView}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RegisterView"
                            component={RegisterView}
                            options={{ headerShown: false }}
                        />
                    </Stack.Group>
                :
                <Stack.Screen
                    name="WelcomeLoaderView"
                    component={WelcomeLoaderView}
                    options={{ headerShown: false }}
                />
            }
        </Stack.Navigator >
    )
}

export default Navigator