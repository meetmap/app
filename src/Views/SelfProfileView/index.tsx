import React from 'react'
import { SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native'
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
import CustomHeader from '../../shared/CustomHeader';
import { useTranslation } from 'react-i18next';
import { H3 } from '../../shared/Text';


export interface ISelfProfileViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SelfProfileView'>;
}

const Tab = createMaterialTopTabNavigator();

const SelfProfileView = ({ navigation }: ISelfProfileViewProps) => {
    const selfUserData = useAppSelector(state => state.userSlice.user)
    const { t } = useTranslation()
    if (!selfUserData) {
        return null
    }
    return (
        <ScrollView
            stickyHeaderIndices={[2]}
            style={{ paddingHorizontal: 16 }}
        >
            <SelfProfileInfo userData={selfUserData} />
            <StyledProfileActions>
                <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title={t("createEvent")} />
                <PrimaryMediumButton btnType='Secondary' onPress={() => SelfProfileActions(selfUserData)}>
                    <MoreIcon />
                </PrimaryMediumButton>
            </StyledProfileActions>
            <H3 style={{paddingVertical: 10, backgroundColor: "white"}}>{t("likedEvents")}</H3>
            <StyledEventsContainer>
                <LikedEvents />
            </StyledEventsContainer>
        </ScrollView>
    )
}

export default SelfProfileView

const StyledProfileActions = styled(View)`
    flex-direction: row;
    gap: 8px;
    width: 100%;
`
const StyledEventsContainer = styled(View)`
`