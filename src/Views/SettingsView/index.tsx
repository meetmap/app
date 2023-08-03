import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Button, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { NavigationProps, RootStackParamList } from '../../types/NavigationProps';
import UserProfileInfo from '../../shared/Profile/UserProfileInfo';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useNavigation } from '@react-navigation/native';
import { H5, H6, Title } from '../../shared/Text';
import EditView from './EditView';
import { IUploadedImage, changeUserProfilePicture, checkAssetsUploadStatus, getUserSelf } from '../../api/users';
import LoaderContainer from '../../shared/LoaderContainer';
import { InitializeUserThunk, LogOutThunk, setUserdata } from '../../store/slices/userSlice';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import PrimaryButton from '../../shared/Buttons/PrimaryButton';
import SelfProfileInfo from '../../shared/Profile/SelfProfile';
import Settings from './Settings';
import { useTranslation } from 'react-i18next';
import PrimaryMediumButton from '../../shared/Buttons/PrimaryMediumButton';

export interface ISettingsViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SettingsView'>;
}

const SettingsView = ({ }: ISettingsViewProps) => {
  const { t } = useTranslation()
  const [editMode, setEditMode] = useState(false)
  const userData = useAppSelector(state => state.userSlice.user)
  const nav = useNavigation();

  const [image, setImage] = useState<IUploadedImage | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [editingError, setEditingError] = useState(undefined)
  const dispatch = useAppDispatch()

  const editFunc = async () => {
    if (editMode) {
      if (image) {
        setIsEditing(true)
        try {
          const { uploadId, status } = await changeUserProfilePicture(image)
          if (status == "failed") {
            throw Error("Upload failed");
          }
          await new Promise((resolve, reject) => {
            const interval = setInterval(async () => {
              try {
                const { status: checkStatus } = await checkAssetsUploadStatus(uploadId)
                if (checkStatus === "succeed") {
                  clearInterval(interval)
                  resolve(status)
                }
                if (checkStatus == "failed") {
                  reject("Upload failed")
                }
              } catch (error) {
                clearInterval(interval)
              }
            }, 500)
          })
          const user = await getUserSelf()
          dispatch(setUserdata(user))
        } catch (error: any) {
          console.log(error.message)
          setEditingError(error.message)
        }
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
        return (
          <TouchableOpacity style={{ width: 80, alignItems: "flex-end" }} onPress={editFunc}>
            <H5 textcolor='Primary' numberOfLines={1} >{editMode ? t("submit") : t("edit")}</H5>
          </TouchableOpacity>
        )
      },
    });
  }, [editMode, image, isEditing]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    const userdata = await getUserSelf()
    dispatch(setUserdata(userdata))
    setRefreshing(false)
  }, []);
  const navigation = useNavigation<NavigationProps>()

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
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, justifyContent: "space-between", paddingHorizontal: 16, gap: 16 }}>
            <View>
              <SelfProfileInfo userData={userData} />
              <Settings />
            </View>
            <StyledButtonsList>
              <PrimaryButton btnType='Secondary' title={t("questions")} />
              <PrimaryButton onPress={() => navigation.navigate("ReportAProblemView")} btnType='Secondary' title={t("reportAProblem")} />
              <PrimaryButton onPress={() => dispatch(LogOutThunk())} btnType='Error' title={t("logout")} />
            </StyledButtonsList>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

export default SettingsView

const StyledButtonsList = styled.View`
  gap: 6px;
`
