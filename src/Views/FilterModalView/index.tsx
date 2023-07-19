import { SafeAreaView } from "react-native-safe-area-context"
import EventLg from "../../shared/EventInList/EventLg"
import LoaderContainer from "../../shared/LoaderContainer"
import { H3 } from "../../shared/Text"
import TextStatus from "../../shared/TextStatus"
import { CustomSafeAreaView } from "../../shared/CustomSafeAreaView"
import { useAppDispatch } from "../../store/hooks"
import { useState } from "react"
import { IEvent } from "../../types/event"
import styled from "styled-components/native"
import { NativeSyntheticEvent, Text, TextInputChangeEventData, View } from "react-native"
import SearchInput from "../../shared/Input/SearchInput"
import { searchEvents } from "../../api/events"

const FilterModalView = () => {

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
        <View>
            {/* <Text>zalupa</Text> */}
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
                        <StyledSearchData>
                            {searchEventsData.map(event => (
                                <EventLg key={`eventList-${event.id}`} eventData={event} />
                            ))}
                        </StyledSearchData>
                    :
                    <TextStatus>
                        <H3>Events not found</H3>
                    </TextStatus>
                }
            </StyledSearchModal>
        </View>
    )
}

export default FilterModalView


const StyledSearchModal = styled(View)`
    flex-direction: column;
    gap: 24px;
    padding: 0 16px;
`

const StyledSearchInputContainer = styled(View)`
    position: sticky;
    top: 0;
    padding-top: 16px;
    padding-bottom: 16px;
    z-index: 1;
    /* background: linear-gradient(180deg, #FFFFFF 90%, rgba(255, 255, 255, 0) 100%); */
`

const StyledSearchData = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

