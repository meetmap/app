import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import { NavigationProps, RootStackParamList } from '@src/types/NavigationProps';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { useNavigation } from '@react-navigation/native';
import { H5 } from '@src/shared/Text';
import EditView from './EditView';
import { IEditUserData, IUploadedImage, changeUserProfilePicture, checkAssetsUploadStatus, getUserSelf, updateUser } from '@src/api/users';
import { LogOutThunk, setUserdata } from '@src/store/slices/userSlice';
import Settings from './Settings';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { SelfProfileInfo } from '@src/shared/Profile';
import { PrimaryButton } from '@src/shared/Buttons';


export interface ISettingsViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SettingsView'>;
}

export const SettingsView: React.FC<ISettingsViewProps> = () => {
  const { t } = useTranslation()
  const [editMode, setEditMode] = useState(false)
  const userData = useAppSelector(state => state.userSlice.user)
  const nav = useNavigation();

  const [image, setImage] = useState<IUploadedImage | undefined>()
  const [isEditing, setIsEditing] = useState(false)
  const [, setEditingError] = useState<string | null>(null)
  const [editUserData, setEditUserData] = useState<IEditUserData>({
    name: userData?.name,
    description: userData?.description
  })
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
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.message)
            setEditingError(error.message)
          }
        }
        // setEditMode(false)
        setImage(undefined)
      }
      if (editUserData.description !== userData?.description || editUserData.name !== userData?.name) {
        setIsEditing(true)
        try {
          await updateUser(editUserData)
          const user = await getUserSelf()
          dispatch(setUserdata(user))
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log(error.message)
            setEditingError(error.message)
          }
        }
      }
      setIsEditing(false)
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
  }, [editMode, image, isEditing, editUserData]);

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
        <EditView setEditUserData={setEditUserData} editUserData={editUserData} userData={userData} setImage={setImage} image={image} />
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

const StyledButtonsList = styled.View`
  gap: 6px;
`
