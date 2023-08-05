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

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
    const [searchEventsData, setSearchEventsData] = useState<IEvent[] | null>(null)
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const [searchInputData, setSearchInputData] = useState<string | null>(null)

    const searchEventsDataFunc = async (text: string) => {
        setIsSearchLoading(true)
        if (text.length > 0) {
            setSearchInputData(text)
            const events = await searchEvents(text)
            setSearchEventsData(events)
        } else {
            setSearchInputData(null)
            setSearchEventsData(null)
        }
        setIsSearchLoading(false)
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        if (searchInputData) {
            const events = await searchEvents(searchInputData)
            setSearchEventsData(events)
        }
        setRefreshing(false)
    }, []);
    
    const { t } = useTranslation()

    return (
        <StyledSearchModal>
            <StyledSearchInputContainer>
                <SearchInput
                    placeholder={t("searchPlaceholder")}
                    onChangeText={searchEventsDataFunc}
                />
            </StyledSearchInputContainer>
            {searchEventsData?.length ?
                isSearchLoading ?
                    <LoaderContainer />
                    :
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        contentContainerStyle={{ paddingBottom: 25 }}
                        data={searchEventsData}
                        horizontal={false}
                        scrollEnabled
                        renderItem={({ item }) => <EventLg eventData={item} />}
                        keyExtractor={item => item.id}
                    />
                :
                <ScrollView
                    style={{flex: 1}}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    <TextStatus>{t("eventsNotFound")}</TextStatus>
                </ScrollView>
            }
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


