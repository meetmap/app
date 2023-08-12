import styled from "styled-components/native"
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavigationProps, RootStackParamList } from "../../types/NavigationProps"
import { H1, H3, H6 } from "../../shared/Text"
import PrimaryMediumButton from "../../shared/Buttons/PrimaryMediumButton"
import TagsContent from "./TagsContent"
import PrimaryFormInput from "../../shared/Input/PrimaryFormInput"
import { Line } from "../../shared/Line"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { IFilters, setFiltersState } from "../../store/slices/filtersSlice"
import PrimaryDatePicker from "../../shared/Input/PrimaryDatePicker"
import { useNavigation } from "@react-navigation/native"

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
    const { tags, minPrice, maxPrice, startDate } = useAppSelector(state => state.filtersSlice.filters)
    const [choosedFilters, setChoosedFilters] = useState<IFilters>({
        tags: [...tags],
        minPrice,
        maxPrice,
        startDate,
        endDate: null
    })
    const navigation = useNavigation<NavigationProps>()
    const dispatch = useAppDispatch()
    const submitFilters = () => {
        dispatch(setFiltersState(choosedFilters))
        navigation.goBack()
    }
    const setFiltersStringValues = (name: string, value: string) => {
        setChoosedFilters({ ...choosedFilters, [name]: value.replace(/[^0-9]/g, '') })
    }
    const setFiltersDateValues = (name: string, value: number | undefined) => {
        if(value)
        setChoosedFilters({ ...choosedFilters, [name]: new Date(value)})
    }
    const clearFilters = () => {
        setChoosedFilters({
            tags: [],
            minPrice: null,
            maxPrice: null,
            startDate: null,
            endDate: null
        })
        dispatch(setFiltersState({
            tags: [],
            minPrice: null,
            maxPrice: null,
            startDate: null,
            endDate: null
        }))
    }
    return (
        <StyledSearchModal>
            <StyledFilterModalHeader>
                <H1>Filters</H1>
            </StyledFilterModalHeader>
            <ScrollView>
                <StyledFiltersContent>
                    <StyledFiltersSection>
                        <H3>Price</H3>
                        <StyledInputsRangeContainer>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput keyboardType='numeric' inputStyle="Primary"  value={choosedFilters.minPrice?.toString()} onChangeText={(value) => setFiltersStringValues("minPrice", value)} placeholder="Min" />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput keyboardType='numeric' inputStyle="Primary" value={choosedFilters.maxPrice?.toString()} onChangeText={(value) => setFiltersStringValues("maxPrice", value)} placeholder="Max" />
                            </View>
                        </StyledInputsRangeContainer>
                    </StyledFiltersSection>
                    <Line />
                    <StyledFiltersSection>
                        <H3>Date</H3>
                        <StyledInputsRangeContainer>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryDatePicker onChange={(value) => setFiltersDateValues("startDate", value.nativeEvent.timestamp)} placeholder="Min date" minimumDate={new Date} value={choosedFilters.startDate || new Date}  initialValue={new Date} />
                            </View>
                            <View style={{ flex: 0.5 }}>
                            <PrimaryDatePicker onChange={(value) => setFiltersDateValues("endDate", value.nativeEvent.timestamp)} placeholder="Max date" minimumDate={new Date} value={choosedFilters.startDate || new Date}  initialValue={new Date} />
                            </View>
                        </StyledInputsRangeContainer>
                    </StyledFiltersSection>
                    <Line />
                    <TagsContent choosedFilters={choosedFilters} setChoosedFilters={setChoosedFilters} />
                </StyledFiltersContent>
            </ScrollView>
            <SafeAreaView>
                <StyledFilterModalFooter>
                    <TouchableOpacity onPress={clearFilters}>
                        <H6 textcolor="Grey">Clear all</H6>
                    </TouchableOpacity>
                    <PrimaryMediumButton onPress={submitFilters} title="Submit"></PrimaryMediumButton>
                </StyledFilterModalFooter>
            </SafeAreaView>
        </StyledSearchModal>
    )
}

export default FilterModalView


const StyledSearchModal = styled(View)`
    flex-direction: column;
    flex: 1;
`

const StyledFilterModalHeader = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`
const StyledFilterModalFooter = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
`
const StyledFiltersContent = styled(View)`
    gap: 16px;
    padding: 0 16px;
    `
const StyledInputsRangeContainer = styled(View)`
flex-direction: row;
    gap: 8px;
`
export const StyledFiltersSection = styled(View)`
    gap: 8px;
`

