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
                contentStyle: {
                    backgroundColor: "white"
                }
            }}

        >
            {!isLoading ?
                user ?
                    <Stack.Group >
                        <Stack.Screen
                            name="Home"
                            component={MainView}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='EventModalView' component={EventModalView} />
                        <Stack.Screen options={{ presentation: "modal", headerShown: false }} name='FilterModalView' component={FilterModalView} />
                        <Stack.Screen name="ProfileView" component={ProfileView} />
                        <Stack.Screen options={{ title: "Your Profile" }} name="SelfProfileView" component={SelfProfileView} />
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