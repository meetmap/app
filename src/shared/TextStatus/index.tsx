import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { H3 } from '../Text'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

const TextStatus = ({ children }: { children: ReactNode }) => {
    return (
        <StyledTextStatusContainer
            entering={FadeIn}
            exiting={FadeOut}
        >
            <H3>{children}</H3>
        </StyledTextStatusContainer>
    )
}

export default TextStatus

const StyledTextStatusContainer = styled(Animated.View)`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`