import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { Button, SafeAreaView, Text, View } from 'react-native'
import { RootStackParamList } from '../../types/NavigationProps';

interface IPageProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileView'>;
}

const ProfileView = ({ navigation }: IPageProps) => {
    return (
        <SafeAreaView>
            <Text>ProfileView</Text>
            <Button title='go to self profile'
            onPress={() =>
                navigation.navigate('SelfProfileView')
            } />
        </SafeAreaView>
    )
}

export default ProfileView
