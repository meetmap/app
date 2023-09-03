import React, { useState } from 'react'
import { ActivityIndicator, Image, View } from 'react-native'
import { ImageProps } from 'react-native'
import FastImage from 'react-native-fast-image'
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils'
import { styled } from 'styled-components/native'

export interface ILoadableImage extends ViewProps {
    profilePicture: string | undefined
    containerSize?: number
    containerBorderRadius?: number
}

const LoadableProfileImage = ({ profilePicture, containerSize = 100, containerBorderRadius = 50, ...rest }: ILoadableImage) => {
    const [isImageLoading, setIsImageLoading] = useState(true)
    return (
        <StyledImageView
            containerBorderRadius={containerBorderRadius}
            containerSize={containerSize}
            {...rest}
        >
            <StyledImage onLoadEnd={() => setIsImageLoading(false)}
                source={profilePicture ?
                    {
                        uri: profilePicture,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                    } :
                    require("../../assets/appIcon.png")
                }
            />
            <StyledActivityIndicator
                animating={isImageLoading}
            />
        </StyledImageView>
    )
}

export default LoadableProfileImage

const StyledImageView = styled(View) <{
    containerBorderRadius: number,
    containerSize: number
}>`
    height: ${props => props.containerSize}px;
    width: ${props => props.containerSize}px;
    border-radius: ${props => props.containerBorderRadius}px;
    overflow: hidden;
    background-color: ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
    position: relative;
`
const StyledImage = styled(FastImage)`
    height: 100%;
    width: 100%;
    object-fit: cover;
`
const StyledActivityIndicator = styled(ActivityIndicator)`
    position: absolute;
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
`