import { useEffect, useState } from "react"
import { IEvent, ITag } from "../../types/event"
import styled from "styled-components/native"
import { View } from "react-native"
import { searchEvents } from "../../api/events"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/NavigationProps"
import { useTranslation } from "react-i18next"
import SearchEventsDataList from "./SearchEventsDataList"
import { AxiosError } from "axios"
import SearchEventsInput from "../../shared/Input/SearchEventsInput"
import { useAppSelector } from "../../store/hooks"
import useAxiosSearch from "../../hooks/useAxiosSearch"

export interface ISearchModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SearchModalView'>;
}

const SearchModalView = ({ }: ISearchModalViewProps) => {

    const filters = useAppSelector(state => state.filtersSlice.filters)
    const [searchText, setSearchText] = useState("")
    const { data: searchEventsData, error: searchError, loading: isSearchLoading, paginate, fetchData } = useAxiosSearch<IEvent>(searchEvents)
    const searchEventsDataFunc = async (text: string) => {
        setSearchText(text)
    }
    const fetchEvents = async () => {
        await fetchData({
            q: searchText,
            ...filters
        })
    }

    useEffect(() => {
        fetchEvents()
    }, [filters, searchText])

    const { t } = useTranslation()


    return (
        <StyledSearchModal>
            <StyledSearchInputContainer>
                <SearchEventsInput
                    placeholder={t("searchPlaceholder")}
                    onChangeText={searchEventsDataFunc}
                />
            </StyledSearchInputContainer>
            <SearchEventsDataList
                searchEventsData={searchEventsData}
                isSearchLoading={isSearchLoading}
                searchError={searchError}
                paginate={paginate}
            />
        </StyledSearchModal>
    )
}

export default SearchModalView


const StyledSearchModal = styled(View)`
    flex-direction: column;
    flex: 1;
    padding: 0 16px;
`

const StyledSearchInputContainer = styled(View)`
    top: 0;
    /* padding-top: 16px; */
    padding-bottom: 16px;
    z-index: 1;
    /* background: linear-gradient(180deg, #FFFFFF 90%, rgba(255, 255, 255, 0) 100%); */
`


