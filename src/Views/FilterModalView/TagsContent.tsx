import React from 'react'
import { H3 } from '../../shared/Text'
import styled from 'styled-components'
import { View } from 'react-native'
import { StyledFiltersSection } from '.'
import useAxios from '../../hooks/useAxios'
import { ITag } from '../../types/event'
import { getTags } from '../../api/events'
import FilterTag from '../../shared/Tags/FilterTag'
import TextStatus from '../../shared/TextStatus'
import LoaderContainer from '../../shared/LoaderContainer'

const TagsContent = () => {
    const { data: tags, error, loading } = useAxios<ITag[]>(getTags())
    if(loading){
        return (
            <LoaderContainer/>
        )
    }
    if(error){
        return (
            <TextStatus>{error.message}</TextStatus>
        )
    }
    if (tags) {
        return (
            <StyledFiltersSection>
                <H3>Tags</H3>
                <StyledTagsContainer>
                    {tags?.map(tag => (
                        <FilterTag key={tag.cid} tag={tag} />
                    ))}
                </StyledTagsContainer>
            </StyledFiltersSection>
        )
    }
}

export default TagsContent

const StyledTagsContainer = styled(View)`
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
`

