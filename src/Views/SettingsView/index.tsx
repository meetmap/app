import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, RefreshControl, SafeAreaView, ScrollView, View } from 'react-native'
import { styled } from 'styled-components/native'
import { RootStackParamList } from '../../types/NavigationProps';
import UserProfileInfo from '../../shared/Profile/UserProfileInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { Title } from '../../shared/Text';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EditView from './EditView';
import { IUploadedImage, changeUserProfilePicture, getUserSelf } from '../../api/users';
import LoaderContainer from '../../shared/LoaderContainer';
import { InitializeUserThunk, LogOutThunk, setUserdata } from '../../store/slices/userSlice';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import PrimaryButton from '../../shared/Buttons/PrimaryButton';
import SelfProfileInfo from '../../shared/Profile/SelfProfile';

export interface ISettingsViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SettingsView'>;
}

const SettingsView = ({ }: ISettingsViewProps) => {
  const [editMode, setEditMode] = useState(false)
  const userData = useAppSelector(state => state.userSlice.user)
  const nav = useNavigation();

  const [image, setImage] = useState<IUploadedImage | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const dispatch = useAppDispatch()

  const editFunc = async () => {
    if (editMode) {
      if (image) {
        setIsEditing(true)
        const user = await changeUserProfilePicture(image)
        dispatch(setUserdata(user))
        setIsEditing(false)
        setEditMode(false)
        setImage(undefined)
      }
      setEditMode(false)
      return
    }
    setEditMode(true)
  }

  useEffect(() => {
    nav.setOptions({
      headerRight: () => {
        if (isEditing) {
          return <ActivityIndicator animating={true} />
        }
        return <Button title={editMode ? "Submit" : "Edit"} onPress={editFunc} />
      },
    });
  }, [editMode, image, isEditing]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const userdata = await getUserSelf()
    dispatch(setUserdata(userdata))
    setRefreshing(false)
  }, []);

  if (userData) {
    if (editMode) {
      return (
        <EditView userData={userData} setImage={setImage} image={image} />
      )
    }
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={{ flex: 1, backgroundColor: "white" }}
      >
        <SelfProfileInfo userData={userData} />
        <PrimaryButton onPress={() => dispatch(LogOutThunk())} btnType='Error' title='Logout'/>
      </ScrollView>
    )
  }
}

export default SettingsView

