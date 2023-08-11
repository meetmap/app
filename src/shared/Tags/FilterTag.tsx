import { useNavigation } from '@react-navigation/native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import styled from 'styled-components/native'
import { NavigationProps } from '../../types/NavigationProps'
import { P } from '../Text'
import { ITag } from '../../types/event'
import { TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { IFilters } from '../../store/slices/filtersSlice'

const FilterTag = ({ tag, choosedFilters, setChoosedFilters }: { tag: ITag, choosedFilters: IFilters, setChoosedFilters: Dispatch<SetStateAction<IFilters>> }) => {
    const tagsState = choosedFilters.tags
    const activeTag = tagsState.includes(tag.cid)
    const handleChooseTag = () => {
        const tagIndex = tagsState.indexOf(tag.cid)
        const newTags = choosedFilters.tags
        if(activeTag){
            newTags.splice(tagIndex, 1)
        } else {
            newTags.push(tag.cid)
        }
        setChoosedFilters({...choosedFilters, tags: newTags})
    }
    return (
        <StyledFilterTag active={!!activeTag} onPress={handleChooseTag}>
            <P textcolor={activeTag ? "White" : "Black"}>{tag.label} ({tag.count})</P>
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