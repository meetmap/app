import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import LoaderIcon from '../Icons/LoaderIcon'

const LoaderContainer = () => {
    return (
        <StyledLoaderContent>
            <LoaderIcon />
        </StyledLoaderContent>
    )
}

export default LoaderContainer

const StyledLoaderContent = styled(View)`
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`