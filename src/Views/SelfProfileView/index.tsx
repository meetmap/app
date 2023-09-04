import React, { useState } from 'react'
import { NativeScrollEvent, RefreshControl, ScrollView, View } from 'react-native'
import LikedEvents from './Events/LikedEvents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/types/NavigationProps';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { styled } from 'styled-components/native';
import MoreIcon from '@src/shared/Icons/MoreIcon';
import SelfProfileActions from '@src/shared/Actions/Users/SelfProfileActions';
import { SelfProfileInfo } from '@src/shared/Profile';
import { useTranslation } from 'react-i18next';
import { H3 } from '@src/shared/Text';
import { getLikedEvents } from '@src/api/events';
import useAxiosPaginated from '@src/hooks/useAxiosPaginated';
import { IEvent } from '@src/types/event';
import { getUserSelf } from '@src/api/users';
import { setUserdata } from '@src/store/slices/userSlice';
import { PrimaryButton } from '@src/shared/Buttons';


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
            //empty
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
                <PrimaryButton btnSize="md" style={{ flex: 1 }} onPress={() => navigation.navigate("CreateEventView")} btnType='Secondary' title={t("createEvent")} />
                <PrimaryButton btnSize="md" style={{ flex: 1 }} onPress={() => navigation.navigate("FavoriteTagsView")} btnType='Secondary' title="Fav tags" />
                <PrimaryButton btnSize="md" btnType='Secondary' onPress={() => SelfProfileActions(selfUserData)}>
                    <MoreIcon />
                </PrimaryButton>
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