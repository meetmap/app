import React, { Dispatch, SetStateAction} from 'react'
import { H3, H6, P, Span } from '@src/shared/Text'
import styled from 'styled-components'
import { TouchableOpacity, View } from 'react-native'
import { StyledFiltersSection } from '.'
import { ITag } from '@src/types/event'
import { getTags } from '@src/api/events'
import FilterTag from '@src/shared/Tags/FilterTag'
import SearchInput from '@src/shared/Input/SearchInput'
import { IFilters } from '@src/store/slices/filtersSlice'
import useAxiosSearch from '@src/hooks/useAxiosSearch'
import { useTranslation } from 'react-i18next'

const TagsContent = ({ choosedFilters, setChoosedFilters }: { choosedFilters: IFilters, setChoosedFilters: Dispatch<SetStateAction<IFilters>> }) => {
    const { data: tags, paginate, fetchData } = useAxiosSearch<ITag>(getTags)
    const handleSearchFilters = async (text: string) => {
        fetchData({ q: text })
    }
    const { t } = useTranslation()
    return (
        <StyledFiltersSection>
            <StyledTagHeader>
                <H3>{t("tags")}</H3>
                <TouchableOpacity style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                    <P>{t("sotrtBy")}</P>
                    <Span textcolor='Primary'>A - z</Span>
                </TouchableOpacity>
            </StyledTagHeader>
            <SearchInput placeholder={t("tagName")} onChangeText={handleSearchFilters} />

            <StyledTagsContainer>
                {tags?.paginatedResults.map(tag => (
                    <FilterTag key={tag.cid} tag={tag} choosedFilters={choosedFilters} setChoosedFilters={setChoosedFilters} />
                ))}
            </StyledTagsContainer>
            {tags?.nextPage &&
                <TouchableOpacity onPress={() => paginate()} style={{ flex: 1, alignItems: "center" }}><H6 textcolor='Grey'>Show more</H6></TouchableOpacity>
            }
        </StyledFiltersSection>
    )

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

