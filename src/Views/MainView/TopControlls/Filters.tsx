import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { motion } from "framer-motion"
import { CubeButton } from '@shared/Buttons/CubeButton';
import CloseSvg from '@assets/close.svg'
import { filterVariants } from '../constants/MotionVariants';
import { filterValues } from '../constants/Filters';
import { IControllsProps } from './MapControlls';
import PrimaryButton from '@shared/Buttons/PrimaryButton';

export interface FiltersProps extends IControllsProps {
    activeFilter: number,
    setActiveFilter: Dispatch<SetStateAction<number>>
}

const Filters: React.FC<FiltersProps> = ({
    setFiltersOpened,
    filtersOpened,
    activeFilter,
    setActiveFilter
}) => {
    return (
        <StyledFiltersTab
            variants={filterVariants}
            animate={!filtersOpened ? "initial" : "visible"}
        // animate={"visible"}
        // exit={"initial"}
        >
            <StyledFiltersContainer
            >
                {filterValues.map((filter, index) => (
                    <PrimaryButton
                        onClick={() => setActiveFilter(index)}
                        key={filter}
                    >
                        {filter}
                    </PrimaryButton>
                ))}
            </StyledFiltersContainer>
            <CubeButton onClick={() => setFiltersOpened(false)}>
                <CloseSvg />
            </CubeButton>
        </StyledFiltersTab>
    )
}

export default Filters

const StyledFiltersTab = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    top: 0;
    gap: 10px;
    width: 100%;
    flex-direction: row;
    position: absolute;
`;
const StyledFiltersContainer = styled(motion.div)`
    /* margin-left: 10px; */
    pointer-events: bounding-box;
    display: flex;
    gap: 10px;
    flex: 1;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;
