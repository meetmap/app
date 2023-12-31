import React, { useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import { styled } from 'styled-components/native'

export interface ILoadableImage extends FastImageProps {
    containerBorderRadius?: number
}

const LoadableImage = ({ containerBorderRadius = 12, ...rest }: ILoadableImage) => {
    const [isImageLoading, setIsImageLoading] = useState(true)
    return (
        <StyledImageView containerBorderRadius={containerBorderRadius}>
            <StyledImage
                onLoadEnd={() => setIsImageLoading(false)}
                {...rest}
            />
            <StyledActivityIndicator
                animating={isImageLoading}
            />
        </StyledImageView>
    )
}

export default LoadableImage

const StyledImageView = styled(View)<{containerBorderRadius: number}>`
    flex: 1;
    background-color: ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
    border-radius: ${props => props.containerBorderRadius}px;
    overflow: hidden;
`
const StyledImage = styled(FastImage)`
    flex: 1;
`
const StyledActivityIndicator = styled(ActivityIndicator)`
    position: absolute;
    left: 0; 
    right: 0; 
    top: 0;
    bottom: 0;
`