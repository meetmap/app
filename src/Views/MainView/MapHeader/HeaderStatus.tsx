import React from 'react'
import { Title } from '../../../shared/Text'
import { useAppSelector } from '../../../store/hooks'
import styled from 'styled-components/native'
import { View } from 'react-native'

const HeaderStatus = () => {
    const { addressState } = useAppSelector(state => state.mapSlice)

    if (addressState && addressState?.administrativeArea !== "(null)" && addressState?.country !== "(null)") {
        return (
            <StyledHeaderMapStatus>
                <Title style={{ textAlign: 'center' }}>{`${addressState.administrativeArea}, ${addressState.country}`}</Title>
            </StyledHeaderMapStatus>
        )
    }
    return null
}

export default HeaderStatus

const StyledHeaderMapStatus = styled(View)`
    align-items: center;
    padding: 0 16px;
`