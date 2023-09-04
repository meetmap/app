import React from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import PrimaryCarousel from '@src/shared/Carousel/PrimaryCarousel'
import { H5, H6 } from '@src/shared/Text'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { launchImageLibrary } from 'react-native-image-picker'
import { IUploadedImage } from '@src/api/events'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { setEventImages } from '@src/store/slices/createEventFormSlice'

const ChooseImagesComponent = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { images } = useAppSelector(state => state.createEventFormSlice)
    const pickImages = async () => {
        const result = await launchImageLibrary({ mediaType: "photo", includeBase64: true, selectionLimit: 10, quality: 0.1 });
        const assets = result.assets
        if (!assets) {
            return;
        }
        const assetsI: IUploadedImage[] = []
        assets.forEach(element => {
            if (element.type && element.uri && element.fileName)
                assetsI.push({
                    name: element.fileName,
                    type: element.type,
                    uri: element.uri
                })
        });
        dispatch(setEventImages(assetsI))
    }

    const { width } = Dimensions.get("screen")

    if (images.length) {
        <View style={{ gap: 6 }}>
            <PrimaryCarousel squared data={[...images.map(image => image.uri)]} width={width - 32} height={150} />
            <TouchableOpacity onPress={pickImages}>
                <H6 textcolor='Primary'>{t("changeImage", { count: images.length })}</H6>
            </TouchableOpacity>
        </View>
    }
    return (
        <StyledEventImagePicker onPress={pickImages}>
            <H5>+ Add images</H5>
        </StyledEventImagePicker>
    )
}

export default ChooseImagesComponent


const StyledEventImagePicker = styled(TouchableOpacity)`
      height: 250px;
      width: 100%;
      border-radius: 20px;
      border: solid 1px #E6EAF2;
      overflow: hidden;
      align-items: center;
      justify-content: center;
`