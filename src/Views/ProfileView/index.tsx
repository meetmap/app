import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { RootStackParamList } from '../../types/NavigationProps';
import UserProfileInfo from '../../shared/Profile/UserProfileInfo';
import { getUserById } from '../../api/users';
import { IPartialUser } from '../../types/users';
import LoaderContainer from '../../shared/LoaderContainer';
import TextStatus from '../../shared/TextStatus';
import styled from 'styled-components';
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton';
import MoreIcon from '../../shared/Icons/MoreIcon';
import { useMap } from '../../hooks/MapProvider';
import ProfileActions from '../../shared/Actions/Users/ProfileActions';
import { useTranslation } from 'react-i18next';
import useAxios from '../../hooks/useAxios';


interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>;
    route: { params: { userId: string } }
}

const ProfileView = ({ route, navigation }: IPageProps) => {
    const { data: userData, loading: userDataLoading, onRefresh, refreshing, error } = useAxios<IPartialUser>(getUserById(route.params.userId))
    const { flyTo } = useMap()


    const { t } = useTranslation()

    if (userDataLoading) {
        return <LoaderContainer />
    }
    if (error) {
        return (
            <TextStatus>
                {error.message}
            </TextStatus>
        )
    }
    if (userData) {
        return (
            <ScrollView
                style={{ height: "100%" }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <UserProfileInfo userData={userData} />
                <StyledProfileActions>
                    <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title={t("inviteToAnEvent")} />
                    <PrimaryMediumButton btnType='Secondary' onPress={() => ProfileActions(userData, flyTo, navigation)}>
                        <MoreIcon />
                    </PrimaryMediumButton>
                </StyledProfileActions>
            </ScrollView>
        )
    }
    return (
        <ScrollView
            style={{ height: "100%" }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <TextStatus>{t("userNotFound")}</TextStatus>
        </ScrollView>
    )
}

export default ProfileView

const StyledProfileActions = styled(View)`
    flex-direction: row;
    gap: 8px;
    width: 100%;
    padding: 0 16px;
`
