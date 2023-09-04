import React from 'react'
import styled from 'styled-components/native'
import { P } from '../Text'
import { ITag } from '@src/types/event'
import { TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '@src/store/hooks'
import { setTagsState } from '@src/store/slices/createEventFormSlice'

const FilterTag = ({ tag }: { tag: ITag }) => {
    const { tagsCids } = useAppSelector(state => state.createEventFormSlice.eventFormValues)
    const activeTag = tagsCids.includes(tag.cid)
    const dispatch = useAppDispatch()
    const handleChooseTag = () => {
        let updatedTags
        if (activeTag) {
            updatedTags = tagsCids.filter(cid => cid !== tag.cid);
        } else {
            if (tagsCids.length >= 15) {
                updatedTags = [...tagsCids.slice(1), tag.cid];
            } else {
                updatedTags = [...tagsCids, tag.cid];
            }
        }
        dispatch(setTagsState(updatedTags));
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