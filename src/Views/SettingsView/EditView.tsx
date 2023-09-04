import React, { Dispatch, SetStateAction } from 'react'
import { Button, TextInput, View } from 'react-native'
import { styled } from 'styled-components/native'
import LoadableProfileImage from '@src/shared/LoadableImage/LoadableProfileImage'
import { IUserSelf } from '@src/types/users'
import { launchImageLibrary } from 'react-native-image-picker'
import { IUploadedImage } from '@src/api/events'
import { useTranslation } from 'react-i18next'
import { IEditUserData } from '@src/api/users'


const EditView = ({ userData, setImage, image, setEditUserData, editUserData }: {
    userData: IUserSelf,
    setImage: Dispatch<SetStateAction<IUploadedImage | undefined>>,
    image: IUploadedImage | undefined,
    setEditUserData: Dispatch<SetStateAction<IEditUserData>>,
    editUserData: IEditUserData
}) => {
    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true, selectionLimit: 1, quality: 0.1 });
        const assets = result.assets
        if (assets?.[0].uri && assets[0].type) {
            setImage({
                name: assets[0].fileName || "profileImg",
                type: assets[0].type,
                uri: assets[0].uri
            })
        }
    }
    const { t } = useTranslation()

    const handleEditUserData = (valueName: string, value: string) => {
        if(!value.length){
            setEditUserData({...editUserData, [valueName]: undefined})
            return
        }
        setEditUserData({...editUserData, [valueName]: value})
    }
    return (
        <StyledEditView>
            <StyledEditImageContainer>
                <LoadableProfileImage profilePicture={image ? image.uri : userData.profilePicture} />
                <Button onPress={pickImage} title={t("editProfileImage")} />
            </StyledEditImageContainer>
            <StyledEditInputsContent>
                <StyledInput onChangeText={(value) => handleEditUserData("name", value)} placeholder={t("yourName")} placeholderTextColor={"#898F99"} value={editUserData.name} />
                <StyledInput onChangeText={(value) => handleEditUserData("description", value)} placeholder={t("aboutYou")} placeholderTextColor={"#898F99"} value={editUserData.description} />
            </StyledEditInputsContent>
        </StyledEditView>
    )
}

export default EditView

const StyledEditView = styled(View)`
    gap: 24px;
    padding: 16px;
    flex: 1;
    `

const StyledEditImageContainer = styled(View)`
    align-items: center;
    gap: 8px;
`
const StyledEditInputsContent = styled(View)`
    gap: 12px;
`

const StyledInput = styled(TextInput)`
    background-color: #F2F5FA;
    padding: 20px 24px;
    border-radius: 12px;

    font-size: 16px;
    font-weight: 400;
    line-height: 22.4px; /* 22.4px */
    letter-spacing: -0.96px;
    
`