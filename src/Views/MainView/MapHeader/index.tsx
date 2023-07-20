import React, { SetStateAction, useState } from 'react'
import styled from 'styled-components'
import HeaderStatus from './HeaderStatus'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ITopControlls {
    activeFilter: number,
    setActiveFilter: React.Dispatch<SetStateAction<number>>
}

const MapHeader = () => {
    return (
        <StyledMapHeader>
            <HeaderStatus/>
        </StyledMapHeader>
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
