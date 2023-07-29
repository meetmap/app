import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setMapFiltersState } from '../../../store/slices/mapSlice'
import styled from 'styled-components'
import CubeButton from '../../../shared/Buttons/CubeButton'

const ChangeFiltersButton = () => {
    const mapFilters = ["Friends", "Events", "All"]
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const dispatch = useAppDispatch()
    const changeMapFilters = () => {
        const filterIndex = mapFilters.indexOf(mapFiler)
        if (filterIndex < mapFilters.length - 1) {
            dispatch(setMapFiltersState(mapFilters[filterIndex + 1]))
        } else {
            dispatch(setMapFiltersState(mapFilters[0]))
        }
    }
    return (
        <StyledCubeButton onPress={changeMapFilters}>

        </StyledCubeButton>
    )
}

export default ChangeFiltersButton

const StyledCubeButton = styled(CubeButton)`
    position: relative;
    overflow: hidden;
`