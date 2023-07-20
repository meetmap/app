import { SafeAreaView } from "react-native-safe-area-context"
import EventLg from "../../shared/EventInList/EventLg"
import LoaderContainer from "../../shared/LoaderContainer"
import { H3 } from "../../shared/Text"
import TextStatus from "../../shared/TextStatus"
import { useAppDispatch } from "../../store/hooks"
import { useState } from "react"
import { IEvent } from "../../types/event"
import styled from "styled-components/native"
import { FlatList, NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native"
import SearchInput from "../../shared/Input/SearchInput"
import { searchEvents } from "../../api/events"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/NavigationProps"

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
    const [searchEventsData, setSearchEventsData] = useState<IEvent[] | null>(null)
    const [isSearchLoading, setIsSearchLoading] = useState(false)
    const searchEventsDataFunc = async (text: string) => {
        setIsSearchLoading(true)
        if (text.length > 0) {
            const events = await searchEvents(text)
            setSearchEventsData(events)
        } else {
            setSearchEventsData(null)
        }
        setIsSearchLoading(false)
    }
    return (
        <StyledSearchModal>
            <StyledSearchInputContainer>
                <SearchInput
                    placeholder="Search..."
                    onChangeText={searchEventsDataFunc}
                />
            </StyledSearchInputContainer>
            {searchEventsData ?
                isSearchLoading ?
                    <LoaderContainer />
                    :
                    <FlatList
                        contentContainerStyle={{ paddingBottom: 25 }}
                        data={searchEventsData}
                        horizontal={false}
                        scrollEnabled
                        renderItem={({ item }) => <EventLg eventData={item} />}
                        keyExtractor={item => item.id}
                    />
                :
                <TextStatus>Events not found</TextStatus>
            }
        </StyledSearchModal>
    )
}

export default FilterModalView


const StyledSearchModal = styled(View)`
    flex-direction: column;
    padding: 0 16px;
`

const StyledSearchInputContainer = styled(View)`
    top: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    z-index: 1;
    /* background: linear-gradient(180deg, #FFFFFF 90%, rgba(255, 255, 255, 0) 100%); */
`


