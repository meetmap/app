import React, { useState } from 'react'
import { NativeScrollEvent, RefreshControl, SafeAreaView, ScrollView, Text, View, useWindowDimensions } from 'react-native'
import LikedEvents from './Events/LikedEvents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationProps';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton';
import { styled } from 'styled-components/native';
import MoreIcon from '../../shared/Icons/MoreIcon';
import SelfProfileActions from '../../shared/Actions/Users/SelfProfileActions';
import SelfProfileInfo from '../../shared/Profile/SelfProfile';
import { useTranslation } from 'react-i18next';
import { H3 } from '../../shared/Text';
import { getLikedEvents } from '../../api/events';
import useAxiosPaginated from '../../hooks/useAxiosPaginated';
import { IEvent } from '../../types/event';
import { getUserSelf } from '../../api/users';
import { setUserdata } from '../../store/slices/userSlice';


export interface ISelfProfileViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SelfProfileView'>;
}

const SelfProfileView = ({ navigation }: ISelfProfileViewProps) => {
    const selfUserData = useAppSelector(state => state.userSlice.user)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const [selfProfileRefreshing, setSelfProfileRefreshing] = useState(false)
    if (!selfUserData) {
        return null
    }
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    const {
        data: likedEvents,
        loading: likedEventsLoading,
        error: likedEventsError,
        paginate,
        fetchData: fetchLikedEventsData
    } = useAxiosPaginated<IEvent>((page) => getLikedEvents(page));
    const refreshSelfProfileView = async () => {
        try {
            setSelfProfileRefreshing(true)
            const userData = await getUserSelf()
            dispatch(setUserdata(userData))
            await fetchLikedEventsData()
            setSelfProfileRefreshing(false)
        } catch (error) {

        }
    }
    return (
        <ScrollView
            stickyHeaderIndices={[2]}
            style={{ paddingHorizontal: 16 }}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    paginate()
                }
            }}
            scrollEventThrottle={16}
            refreshControl={<RefreshControl refreshing={selfProfileRefreshing} onRefresh={refreshSelfProfileView} />}
        >
            <SelfProfileInfo userData={selfUserData} />
            <StyledProfileActions>
                <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title={t("createEvent")} />
                <PrimaryMediumButton btnType='Secondary' onPress={() => SelfProfileActions(selfUserData)}>
                    <MoreIcon />
                </PrimaryMediumButton>
            </StyledProfileActions>
            <H3 style={{ paddingVertical: 10, backgroundColor: "white" }}>{t("likedEvents")}</H3>
            <StyledEventsContainer>
                <LikedEvents likedEvents={likedEvents} likedEventsLoading={likedEventsLoading} likedEventsError={likedEventsError} />
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