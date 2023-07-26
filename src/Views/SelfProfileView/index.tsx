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
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton';
import { styled } from 'styled-components/native';
import MoreIcon from '../../shared/Icons/MoreIcon';
import { useMap } from '../../hooks/MapProvider';
import SelfProfileActions from '../../shared/Actions/Users/SelfProfileActions';
import SelfProfileInfo from '../../shared/Profile/SelfProfile';


export interface ISelfProfileViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SelfProfileView'>;
}

const Tab = createMaterialTopTabNavigator();

const SelfProfileView = ({ navigation }: ISelfProfileViewProps) => {
    const selfUserData = useAppSelector(state => state.userSlice.user)
    const { mapViewRef } = useMap()
    if (!selfUserData) {
        return null
    }
    return (
        <View style={{ height: "100%", backgroundColor: "white" }}>
            <SelfProfileInfo userData={selfUserData} />
            <StyledProfileActions>
                {/* <PrimaryMediumButton style={{flex: 1}} btnType='Secondary'>
                    Create Event
                </PrimaryMediumButton> */}
                <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title='Invite friend' />
                <PrimaryMediumButton btnType='Secondary' onPress={() => SelfProfileActions(selfUserData)}>
                    <MoreIcon />
                </PrimaryMediumButton>
            </StyledProfileActions>
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

const StyledProfileActions = styled(View)`
    flex-direction: row;
    gap: 8px;
    width: 100%;
    padding: 0 16px;
`