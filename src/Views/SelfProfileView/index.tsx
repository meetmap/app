import React from 'react'
import { Text, View, useWindowDimensions } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'
import Users from './Tabs/Users';
import LikedEvents from './Tabs/Events/LikedEvents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationProps';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from './Tabs/Users/Friends';
import { useAppSelector } from '../../store/hooks';
import UserProfileInfo from '../../shared/Profile/UserProfileInfo';


export interface ISelfProfileViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SelfProfileView'>;
}

const Tab = createMaterialTopTabNavigator();

const SelfProfileView = ({ navigation }: ISelfProfileViewProps) => {
    const selfUserData = useAppSelector(state => state.userSlice.user)
    if (!selfUserData) {
        return null
    }
    return (
        <View style={{ height: "100%", backgroundColor: "white" }}>
            <UserProfileInfo userData={selfUserData} />
            <Tab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 42,
                    },
                    tabBarLabelStyle: {
                        fontSize: 14,
                        textTransform: "none",
                    },
                    tabBarActiveTintColor: "#2671FF",
                    tabBarInactiveTintColor: "#5C5E66",
                    tabBarIndicatorStyle: {
                        backgroundColor: "#2671FF"
                    }
                }}
            >
                <Tab.Screen name="Liked Events" component={LikedEvents} />
                <Tab.Screen name="Users" component={Users} />
            </Tab.Navigator>
        </View>
    )
}

export default SelfProfileView