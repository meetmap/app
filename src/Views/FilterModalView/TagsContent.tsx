import React, { Dispatch, SetStateAction } from 'react'
import { H3, H6, P, Span } from '../../shared/Text'
import styled from 'styled-components'
import { TouchableOpacity, View } from 'react-native'
import { StyledFiltersSection } from '.'
import useAxios from '../../hooks/useAxios'
import { ITag } from '../../types/event'
import { getTags } from '../../api/events'
import FilterTag from '../../shared/Tags/FilterTag'
import TextStatus from '../../shared/TextStatus'
import LoaderContainer from '../../shared/LoaderContainer'
import SearchInput from '../../shared/Input/SearchInput'
import RightArrowIcon from '../../shared/Icons/RightArrowIcon'
import { IPaginateRespose } from '../../types/response'
import { IFilters } from '../../store/slices/filtersSlice'

const TagsContent = ({ choosedFilters, setChoosedFilters }: { choosedFilters: IFilters, setChoosedFilters: Dispatch<SetStateAction<IFilters>> }) => {
    const { data: tags, error, loading } = useAxios<IPaginateRespose<ITag>>(getTags())
    if (loading) {
        return (
            <LoaderContainer />
        )
    }
    if (error) {
        return (
            <TextStatus>{error.message}</TextStatus>
        )
    }
    if (tags) {
        return (
            <StyledFiltersSection>
                <StyledTagHeader>
                    <H3>Tags</H3>
                    <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                        <P>Sort by:</P>
                        <Span textcolor='Primary'>A - z</Span>
                    </TouchableOpacity>
                </StyledTagHeader>
                <SearchInput placeholder='Tag name' />
                <StyledTagsContainer>
                    {tags.paginatedResults.slice(0, 10).map(tag => (
                        <FilterTag key={tag.cid} tag={tag} choosedFilters={choosedFilters} setChoosedFilters={setChoosedFilters} />
                    ))}
                </StyledTagsContainer>
                <TouchableOpacity style={{ flex: 1, alignItems: "center" }}><H6 textcolor='Grey'>Show more</H6></TouchableOpacity>
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
const StyledTagHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`

