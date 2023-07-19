import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { H3 } from '../Text'
import { View } from 'react-native'

const TextStatus = ({ children }: { children: ReactNode }) => {
    return (
        <StyledTextStatusContainer>
            <H3>{children}</H3>
        </StyledTextStatusContainer>
    )
}

export default TextStatus

const StyledTextStatusContainer = styled(View)`
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`