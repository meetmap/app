import { useState } from "react"
import { IEvent } from "../../types/event"
import styled from "styled-components/native"
import { View } from "react-native"
import { searchEvents } from "../../api/events"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/NavigationProps"
import { useTranslation } from "react-i18next"
import SearchEventsDataList from "./SearchEventsDataList"
import { AxiosError } from "axios"
import SearchEventsInput from "../../shared/Input/SearchEventsInput"
import { IPaginateRespose } from "../../types/response"
import { useAppSelector } from "../../store/hooks"
import { getFromSecureStore } from "../../api/secure-store"
import { SecureStoreKeys } from "../../constants"

export interface ISearchModalViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SearchModalView'>;
}

const SearchModalView = ({ }: ISearchModalViewProps) => {
    const [searchEventsData, setSearchEventsData] = useState<IPaginateRespose<IEvent> | null>(null)
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [searchInputData, setSearchInputData] = useState<string | null>(null)
    const [searchError, setSearchError] = useState<AxiosError | null>(null);

    const filters = useAppSelector(state => state.filtersSlice.filters)

    const searchEventsDataFunc = async (text: string) => {
        setIsSearchLoading(true)
        if (text.length > 0) {
            setSearchInputData(text)
            try {
                const events = await searchEvents({
                    q: text,
                    ...filters
                })
                setSearchEventsData(events)
            } catch (error) {
                setSearchError(error as AxiosError)
            }
        } else {
            setSearchInputData(null)
            setSearchEventsData(null)
        }
        setIsSearchLoading(false)
    }


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
                setSearchEventsData={setSearchEventsData}
                searchInputData={searchInputData}
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
    padding-top: 16px;
    padding-bottom: 16px;
    z-index: 1;
    /* background: linear-gradient(180deg, #FFFFFF 90%, rgba(255, 255, 255, 0) 100%); */
`


