import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setMapFiltersState } from '../../../store/slices/mapSlice'
import styled from 'styled-components'
import CubeButton from '../../../shared/Buttons/CubeButton'
import UsersIcon from '../../../shared/Icons/UsersIcon'
import TicketIcon from '../../../shared/Icons/TicketIcon'
import FiltersIcon from '../../../shared/Icons/FiltersIcon'

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