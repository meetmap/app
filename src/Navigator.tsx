import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeView from './Views/WelcomeView';
import LoginView from './Views/LoginView';
import MainView from './Views/MainView';
import ProfileView from './Views/ProfileView';
import SelfProfileView from './Views/SelfProfileView';
import FilterModalView from './Views/FilterModalView';
import { InitializeUserThunk } from './store/slices/userSlice';
import EventModalView from './Views/EventModalView';
import WelcomeLoaderView from './Views/WelcomeLoaderView';
import MyBottomSheet from './Views/MyBottomSheet';
import { Alert, Button, TouchableOpacity } from 'react-native';
import LoadableProfileImage from './shared/LoadableImage/LoadableProfileImage';
import SettingsIcon from './shared/Icons/SettingsIcon';
import GoBackArrowIcon from './shared/Icons/GoBackArrowIcon';
import SettingsView from './Views/SettingsView';
import EventsListModalView from './Views/EventListModalView';
import UsersListModalView from './Views/UsersListModalView';
import RegisterView from './Views/RegisterView';
import ChooseLanguageView from './Views/ChooseLanguageView';
import { useTranslation } from 'react-i18next';
import ReportAProblemView from './Views/ReportAProblemView';
import CreateEventView from './Views/CreateEventView';
import InviteFriendsModalView from './Views/InviteFriendsModalView';
import ErrorPopup from './shared/ErrorPopup';
import FriendsModalView from './Views/FriendsModalView';
import SearchModalView from './Views/SearchModalView';
import EventLikesModalView from './Views/EventLikesModalView';
const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { user, isLoading } = useAppSelector((state) => state.userSlice);
    const { t } = useTranslation()
    return (
        <Stack.Navigator
            screenOptions={({ navigation }) => ({
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
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventModalView' component={EventModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventsListModalView' component={EventsListModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='FriendsModalView' component={FriendsModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='UsersListModalView' component={UsersListModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='InviteFriendsModalView' component={InviteFriendsModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventLikesModalView' component={EventLikesModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='SearchModalView' component={SearchModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='FilterModalView' component={FilterModalView} />
                        <Stack.Screen
                            name="ProfileView"
                            component={ProfileView}
                            options={(route) => ({
                                title: `@${route.route.params.username}`,
                                headerTitleStyle: {
                                    fontSize: 18,
                                    fontWeight: "900"
                                }
                            })}
                        />
                        <Stack.Screen
                            options={({ navigation }) => ({
                                title: "",
                                // headerShown: false,
                                headerRight: (data) => (
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
                        <Stack.Screen options={{ title: t("createEvent") }} name={"CreateEventView"} component={CreateEventView} />
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
                        <Stack.Screen options={{ title: t("chooseLanguage") }} name={"ChooseLanguageView"} component={ChooseLanguageView} />
                        <Stack.Screen
                            name={"MyBottomSheet"}
                            component={MyBottomSheet}
                            options={{
                                headerShown: false,
                                presentation: "transparentModal",
                            }}
                        />
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