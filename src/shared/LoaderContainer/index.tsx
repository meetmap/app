import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styled from 'styled-components/native'

const LoaderContainer = () => {
    return (
        <StyledLoaderContent>
            <ActivityIndicator
                animating={true}
            />
            {/* <LoaderIcon/> */}
        </StyledLoaderContent>
    )
}

export default LoaderContainer

const StyledLoaderContent = styled(View)`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`