import React, { SetStateAction, useState } from 'react'
import styled from 'styled-components'
import Filters from './Filters'
import OpenFiltersButton from './MapControlls'
import { AnimatePresence, motion } from 'framer-motion'
import { controllsVariants, filterVariants } from '../constants/MotionVariants'
import MapControlls from './MapControlls'

interface ITopControlls {
    activeFilter: number,
    setActiveFilter: React.Dispatch<SetStateAction<number>>
}

const TopControlls = ({ activeFilter, setActiveFilter }: ITopControlls) => {
    const [filtersOpened, setFiltersOpened] = useState(false)
    return (
        <StyledTopContainer>
            <MapControlls
                filtersOpened={filtersOpened}
                setFiltersOpened={setFiltersOpened}
            />
            <AnimatePresence>
                <Filters
                    activeFilter={activeFilter}
                    setActiveFilter={setActiveFilter}
                    filtersOpened={filtersOpened}
                    setFiltersOpened={setFiltersOpened}
                />
            </AnimatePresence>
        </StyledTopContainer>
    )
}

export default TopControlls

const StyledTopContainer = styled.div`
    position: relative;
`
