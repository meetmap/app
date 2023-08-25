import React, { useEffect, useState } from 'react'
import { Title } from '../../../shared/Text'
import { useAppSelector } from '../../../store/hooks'
import styled from 'styled-components/native'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useMap } from '../../../hooks/MapProvider'

const HeaderStatus = () => {
    const { addressState } = useAppSelector(state => state.mapSlice)
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const [filterShows, setFilterShows] = useState(false)
    const { errorMessage } = useAppSelector(state => state.globalErrorSlice)
    const { mapViewRef } = useMap()
    useEffect(() => {
        const showCurrentFilter = () => {
            setFilterShows(true)
            setTimeout(() => {
                setFilterShows(false)
            }, 1500)
        }
        showCurrentFilter()
        return (showCurrentFilter)
    }, [mapFiler])

    // useEffect(() => {
    //     async () => {
    //         const camera = await mapViewRef.current?.getCamera()
    //     }
    // }, [addressState])



    if (errorMessage) {
        return (
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Title style={{ textAlign: 'center' }}>
                    {errorMessage}
                </Title>
            </Animated.View>
        )
    }
    if (filterShows) {
        return (
            <Animated.View
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Title style={{ textAlign: 'center' }}>
                    {mapFiler}
                </Title>
            </Animated.View>
        )
    }
    if (addressState && addressState?.administrativeArea !== "(null)" && addressState?.country !== "(null)") {
        return (
            <StyledHeaderMapStatus
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Title style={{ textAlign: 'center' }}>
                    {`${addressState.administrativeArea}, ${addressState.country}`}
                </Title>
            </StyledHeaderMapStatus>
        )
    }
    return null
}

export default HeaderStatus

const StyledHeaderMapStatus = styled(Animated.View)`
    align-items: center;
    padding: 0 16px;
`