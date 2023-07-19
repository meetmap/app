import React, { Dispatch, SetStateAction } from 'react'
import { FiltersProps } from './Filters'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion'
import LayersSvg from '@assets/layers.svg'
import { CubeButton } from '@shared/Buttons/CubeButton'
import { controllsVariants } from '../constants/MotionVariants'
import { Link } from 'react-router-dom'


export interface IControllsProps {
    setFiltersOpened: Dispatch<SetStateAction<boolean>>
    filtersOpened: boolean
}

const MapControlls = ({ setFiltersOpened, filtersOpened }: IControllsProps) => {
    return (
        <StyledTopControlls
            animate={filtersOpened ? "initial" : "visible"}
            variants={controllsVariants}
            initial={"initial"}
        >
            <AnimatePresence>
                <motion.div>
                    <MotionFiltersButton
                        circle
                        onClick={() => setFiltersOpened(true)}
                    >
                        <LayersSvg />
                    </MotionFiltersButton>
                </motion.div>
            </AnimatePresence>
            <Link to={"/search-event"}>
                <MotionFiltersButton
                    circle
                >
                    <LayersSvg />
                </MotionFiltersButton>
            </Link>
        </StyledTopControlls>
    )
}

export default MapControlls

const StyledTopControlls = styled(motion.div)`
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    width: fit-content;
    position: absolute;
    right: 0;
`
const MotionFiltersButton = styled(motion(CubeButton))`

`
