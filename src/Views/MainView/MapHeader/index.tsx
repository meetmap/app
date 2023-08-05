import React, { SetStateAction, useState } from 'react'
import styled from 'styled-components'
import HeaderStatus from './HeaderStatus'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'

interface ITopControlls {
    activeFilter: number,
    setActiveFilter: React.Dispatch<SetStateAction<number>>
}

const MapHeader = () => {
    return (
        <StyledLinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#00b3ff', "rgba(148, 216, 255, 0.00)"]}>
            <StyledMapHeader>
                <HeaderStatus />
            </StyledMapHeader>
        </StyledLinearGradient>
    )
}

export default MapHeader

const StyledMapHeader = styled(SafeAreaView)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
`
const StyledLinearGradient = styled(LinearGradient)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    align-items: center;
    height: 250px;
    pointer-events: none;
`
