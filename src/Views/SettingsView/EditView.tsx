import React, { Dispatch, SetStateAction, useState } from 'react'
import { Button, Image, TextInput, TouchableOpacity, View } from 'react-native'
import { styled } from 'styled-components/native'
import LoadableProfileImage from '../../shared/LoadableImage/LoadableProfileImage'
import { IUserSelf } from '../../types/users'
import PrimaryFormInput from '../../shared/Input/PrimaryFormInput'
import { H6 } from '../../shared/Text'
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker'
import { IUploadedImage } from '../../api/events'


const EditView = ({ userData, setImage, image }: { userData: IUserSelf, setImage: Dispatch<SetStateAction<IUploadedImage | undefined>>, image: IUploadedImage | undefined }) => {
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
    return (
        <StyledEditView>
            <StyledEditImageContainer>
                <LoadableProfileImage profilePicture={image ? image.uri : userData.profilePicture} />
                <Button onPress={pickImage} title='Edit profile image' />
            </StyledEditImageContainer>
            <StyledEditInputsContent>
                <StyledInput placeholder="Your name" placeholderTextColor={"#898F99"} value={userData.name} />
                <StyledInput placeholder="About you" placeholderTextColor={"#898F99"} value={userData.description} />
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