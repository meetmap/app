import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { IFilters } from '../../store/slices/filtersSlice'
import useAxiosPaginated from '../../hooks/useAxiosPaginated'
import useAxiosSearch from '../../hooks/useAxiosSearch'

const TagsContent = ({ choosedFilters, setChoosedFilters }: { choosedFilters: IFilters, setChoosedFilters: Dispatch<SetStateAction<IFilters>> }) => {
    const { data: tags, error, loading, paginate, fetchData } = useAxiosSearch<ITag>(getTags)
    const handleSearchFilters = async (text: string) => {
        fetchData({ q: text })
    }
    // useEffect(() => {
    //     console.log(tags)
    // }, [searchFiltersValue])

    // if (loading) {
    //     return (
    //         <LoaderContainer />
    //     )
    // }
    // if (error) {
    //     return (
    //         <TextStatus>{error.message}</TextStatus>
    //     )
    // }
    // if (tags) {
    return (
        <StyledFiltersSection>
            <StyledTagHeader>
                <H3>Tags</H3>
                <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                    <P>Sort by:</P>
                    <Span textcolor='Primary'>A - z</Span>
                </TouchableOpacity>
            </StyledTagHeader>
            <SearchInput placeholder='Tag name' onChangeText={handleSearchFilters} />

            <StyledTagsContainer>
                {tags?.paginatedResults.map(tag => (
                    <FilterTag key={tag.cid} tag={tag} choosedFilters={choosedFilters} setChoosedFilters={setChoosedFilters} />
                ))}
            </StyledTagsContainer>
            {tags?.nextPage &&
                <TouchableOpacity onPress={paginate} style={{ flex: 1, alignItems: "center" }}><H6 textcolor='Grey'>Show more</H6></TouchableOpacity>
            }
        </StyledFiltersSection>
    )
    // }
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

