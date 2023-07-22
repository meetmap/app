import React, { useEffect, useState } from 'react'
import { Title } from '../../../shared/Text'
import { useAppSelector } from '../../../store/hooks'
import styled from 'styled-components/native'
import { View } from 'react-native'

const HeaderStatus = () => {
    const { addressState } = useAppSelector(state => state.mapSlice)
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const [filterShows, setFilterShows] = useState(false)
    useEffect(() => {
        const showCurrentFilter = () => {
            setFilterShows(true)
            setTimeout(() => {
                setFilterShows(false)
            }, 1000)
        }
        showCurrentFilter()
        return (showCurrentFilter)
    }, [mapFiler])

    
    if (filterShows) {
        return (
            <Title style={{ textAlign: 'center' }}>
                {mapFiler}
            </Title>
        )
    }
    if (addressState && addressState?.administrativeArea !== "(null)" && addressState?.country !== "(null)") {
        return (
            <StyledHeaderMapStatus>
                <Title style={{ textAlign: 'center' }}>
                    {`${addressState.administrativeArea}, ${addressState.country}`}
                </Title>
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