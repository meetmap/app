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
import { Alert, Button } from 'react-native';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const { user, isLoading } = useAppSelector((state) => state.userSlice);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(InitializeUserThunk());
    }, []);
    return (
        <Stack.Navigator
            screenOptions={{

                // contentStyle: {
                //     backgroundColor: "white"
                // }
                headerShadowVisible: false
            }}

        >
            {!isLoading ?
                user ?
                    <Stack.Group >
                        <Stack.Screen
                            name="MainView"
                            component={MainView}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventModalView' component={EventModalView} />
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
                            options={{
                                title: "Your Profile",
                                headerRight: (data) => (
                                    <Button
                                        onPress={() => Alert.alert((JSON.stringify(data)))}
                                        title="Settings"
                                    />
                                ),
                            }}
                            name="SelfProfileView"
                            component={SelfProfileView}
                        />
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
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="LoginView"
                            component={LoginView}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="RegisterView"
                            component={WelcomeView}
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