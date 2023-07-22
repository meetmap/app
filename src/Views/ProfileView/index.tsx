import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
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
import SelfProfileActions from '../../shared/Actions/Users/SelfProfileActions copy';
import ProfileActions from '../../shared/Actions/Users/ProfileActions';

interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>;
}

const ProfileView = (props: IPageProps) => {
    const [userData, setUserData] = useState<IPartialUser | null>(null)
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false)
    const { mapViewRef } = useMap()
    const getUserDataById = async () => {
        setUserDataLoading(true)
        const userResData = await getUserById(props.route.params.userId)
        setUserData(userResData)
        setUserDataLoading(false)
    }
    useEffect(() => {
        getUserDataById()
    }, [props.route.params.userId])

    // console.log(userData?.friends)
    if (userDataLoading) {
        return <LoaderContainer />
    }
    if (userData) {
        return (
            <View style={{ height: "100%", backgroundColor: "white" }}>
                <UserProfileInfo userData={userData} />
                <StyledProfileActions>
                    <PrimaryMediumButton style={{ flex: 1 }} btnType='Secondary' title='Invite to an event' />
                    <PrimaryMediumButton btnType='Secondary' onPress={() => ProfileActions(userData, mapViewRef, props.navigation)}>
                        <MoreIcon />
                    </PrimaryMediumButton>
                </StyledProfileActions>
            </View>
        )
    }
    return (
        <TextStatus>User not found</TextStatus>
    )
}

export default ProfileView

const StyledProfileActions = styled(View)`
    flex-direction: row;
    gap: 8px;
    width: 100%;
    padding: 0 16px;
`
