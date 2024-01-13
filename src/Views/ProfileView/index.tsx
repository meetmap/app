import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { RootStackParamList } from '@src/types/NavigationProps';
import { getUserById } from '@src/api/users';
import { IPartialUser } from '@src/types/users';
import LoaderContainer from '@src/shared/LoaderContainer';
import TextStatus from '@src/shared/TextStatus';
import styled from 'styled-components';
import MoreIcon from '@src/shared/Icons/MoreIcon';
import { useMap } from '@src/hooks/MapProvider';
import ProfileActions from '@src/shared/Actions/Users/ProfileActions';
import { useTranslation } from 'react-i18next';
import useAxios from '@src/hooks/useAxios';
import { PrimaryButton } from '@src/shared/Buttons';
import { UserProfileInfo } from '@src/shared/Profile';


interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>;
    route: { params: { userCid: string } }
}

export const ProfileView = ({ route, navigation }: IPageProps) => {
    const { data: userData, loading: userDataLoading, onRefresh, refreshing, error } = useAxios<IPartialUser>(getUserById(route.params.userCid))
    const { flyTo } = useMap()

    const { t } = useTranslation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: userData?.username
        });
    }, [!!userData])

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
                    <PrimaryButton btnSize="md" style={{ flex: 1 }} btnType='Secondary' title={t("inviteToAnEvent")} />
                    <PrimaryButton btnSize="md" btnType='Secondary' onPress={() => ProfileActions(userData, flyTo, navigation)}>
                        <MoreIcon />
                    </PrimaryButton>
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


const StyledProfileActions = styled(View)`
    flex-direction: row;
    gap: 8px;
    width: 100%;
    padding: 0 16px;
`
