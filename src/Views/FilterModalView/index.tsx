import { SafeAreaView } from "react-native-safe-area-context"
import EventLg from "../../shared/EventInList/EventLg"
import LoaderContainer from "../../shared/LoaderContainer"
import { H3 } from "../../shared/Text"
import TextStatus from "../../shared/TextStatus"
import { useAppDispatch } from "../../store/hooks"
import { useCallback, useState } from "react"
import { IEvent } from "../../types/event"
import styled from "styled-components/native"
import { FlatList, NativeSyntheticEvent, RefreshControl, ScrollView, Text, TextInputChangeEventData, View } from "react-native"
import SearchInput from "../../shared/Input/SearchInput"
import { searchEvents } from "../../api/events"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/NavigationProps"
import { useTranslation } from "react-i18next"
import useAxios from "../../hooks/useAxios"
import SearchEventsDataList from "./SearchEventsDataList"
import { AxiosError } from "axios"

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
    const [searchEventsData, setSearchEventsData] = useState<IEvent[] | null>(null)
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [searchInputData, setSearchInputData] = useState<string | null>(null)
    const [searchError, setSearchError] = useState<AxiosError | null>(null);

    const searchEventsDataFunc = async (text: string) => {
        setIsSearchLoading(true)
        if (text.length > 0) {
            setSearchInputData(text)
            try {
                const events = await searchEvents(text)
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
                <SearchInput
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

export default FilterModalView


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


