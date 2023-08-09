import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import styled from 'styled-components/native'
import { NavigationProps } from '../../types/NavigationProps'
import { P } from '../Text'
import { ITag } from '../../types/event'
import { TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setTagFiltersState } from '../../store/slices/filtersSlice'

const FilterTag = ({ tag }: { tag: ITag }) => {
    const activeTag = useAppSelector(state => state.filtersSlice.tags).includes(tag.label)
    const dispatch = useAppDispatch()
    const handleChooseTag = () => {
        dispatch(setTagFiltersState(tag.label))
    }
    return (
        <StyledFilterTag active={activeTag} onPress={handleChooseTag}>
            <P textcolor={activeTag ? "White" : "Black"}>{tag.label}</P>
        </StyledFilterTag>
    )
}

export default FilterTag

const StyledFilterTag = styled(TouchableOpacity) <{ active: boolean }>`
    padding: 6px 8px;
    border-radius: 12px;
    border: 1px solid #E6EAF2;
    background-color: ${props => props.active ? props.theme.colors.BUTTON.Primary.BGDefault : "white"};
`