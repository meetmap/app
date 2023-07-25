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


interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>;
}

const ProfileView = (props: IPageProps) => {
    const [userData, setUserData] = useState<IPartialUser | null>(null)
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false)
    const { flyTo } = useMap()
    const getUserDataById = async () => {
        setUserDataLoading(true)
        const userResData = await getUserById(props.route.params.userId)
        setUserData(userResData)
        setUserDataLoading(false)
    }
    useEffect(() => {
        getUserDataById()
    }, [props.route.params.userId])

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        const userResData = await getUserById(props.route.params.userId)
        setUserData(userResData)
        setRefreshing(false)
    }, []);

    // console.log(userData?.friends)
    if (userDataLoading) {
        return <LoaderContainer />
    }
    if (userData) {
        return (
            <ScrollView
                style={{ height: "100%", backgroundColor: "white" }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <UserProfileInfo userData={userData} />
                <StyledProfileActions>
                    <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title='Invite to an event' />
                    <PrimaryMediumButton btnType='Secondary' onPress={() => ProfileActions(userData, flyTo, props.navigation)}>
                        <MoreIcon />
                    </PrimaryMediumButton>
                </StyledProfileActions>
            </ScrollView>
        )
    }
    return (
        <ScrollView
            style={{ height: "100%", backgroundColor: "white" }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <TextStatus>User not found</TextStatus>
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
