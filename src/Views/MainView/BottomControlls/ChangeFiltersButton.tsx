import React from 'react'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { setMapFiltersState } from '@src/store/slices/mapSlice'
import styled from 'styled-components'
import UsersIcon from '@src/shared/Icons/UsersIcon'
import TicketIcon from '@src/shared/Icons/TicketIcon'
import FiltersIcon from '@src/shared/Icons/FiltersIcon'
import { CubeButton } from '@src/shared/Buttons'

const ChangeFiltersButton = () => {
    const mapFilters = [
        {
            name: "Friends",
            icon: <UsersIcon />
        },
        {
            name: "Events",
            icon: <TicketIcon fill='black'/>
        },
        {
            name: "All",
            icon: <FiltersIcon/>
        }
    ]
    const mapFiler = useAppSelector(state => state.mapSlice.mapFilters)
    const dispatch = useAppDispatch()
    const filterIndex = mapFilters.findIndex(filter => filter.name === mapFiler)
    const changeMapFilters = () => {
        if (filterIndex < mapFilters.length - 1) {
            dispatch(setMapFiltersState(mapFilters[filterIndex + 1].name))
        } else {
            dispatch(setMapFiltersState(mapFilters[0].name))
        }
    }
    return (
        <StyledCubeButton onPress={changeMapFilters}>
            {mapFilters[filterIndex].icon}
        </StyledCubeButton>
    )
}

export default ChangeFiltersButton

const StyledCubeButton = styled(CubeButton)`
    position: relative;
    overflow: hidden;
`