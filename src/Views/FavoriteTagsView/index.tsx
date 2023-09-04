import React, { useEffect, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import { H3, H5, H6, P, Span } from '@src/shared/Text'
import useAxiosSearch from '@src/hooks/useAxiosSearch'
import { getTags } from '@src/api/events'
import { ITag } from '@src/types/event'
import { useTranslation } from 'react-i18next'
import SearchInput from '@src/shared/Input/SearchInput'
import FavTag from '@src/shared/Tags/FavTag'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'

const FavoriteTagsView = () => {
    const { data: tags,  paginate, fetchData } = useAxiosSearch<ITag>(getTags)
    const handleSearchFilters = async (text: string) => {
        fetchData({ q: text })
    }
    const [favTags, setFavTags] = useState<{ cid: string, value: number }[]>([])
    const { t } = useTranslation()
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                // if (updatingTags) {
                //     return <ActivityIndicator animating={true} />
                // }
                if (favTags.length) {
                    return (
                        <TouchableOpacity style={{ width: 80, alignItems: "flex-end" }}>
                            <H5 textcolor='Primary' numberOfLines={1}>{t("save")}</H5>
                        </TouchableOpacity>
                    )
                }
            },
        });
    }, [favTags]);


    return (
        <ScrollView>
            <View style={{ paddingHorizontal: 16, gap: 8 }}>
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
                        <FavTag setFavTags={setFavTags} count={favTags.find(element => element.cid == tag.cid)?.value || 0} key={tag.cid} tag={tag} favTags={favTags} />
                    ))}
                </StyledTagsContainer>
                {tags?.nextPage &&
                    <TouchableOpacity onPress={() => paginate()} style={{ flex: 1, alignItems: "center" }}><H6 textcolor='Grey'>Show more</H6></TouchableOpacity>
                }
            </View>
        </ScrollView>
    )
}

export default FavoriteTagsView

const StyledTagsContainer = styled(View)`
    flex-direction: row;
    gap: 12px;
    flex-wrap: wrap;
`
const StyledTagHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
`

