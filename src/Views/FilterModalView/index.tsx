import styled from "styled-components/native"
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { NavigationProps, RootStackParamList } from "../../types/NavigationProps"
import { H1, H3, H6 } from "../../shared/Text"
import PrimaryMediumButton from "../../shared/Buttons/PrimaryMediumButton"
import TagsContent from "./TagsContent"
import PrimaryFormInput from "../../shared/Input/PrimaryFormInput"
import { Line } from "../../shared/Line"
import { useCallback, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { IFilters, setFiltersState } from "../../store/slices/filtersSlice"
import PrimaryDatePicker from "../../shared/Input/PrimaryDatePicker"
import { useNavigation } from "@react-navigation/native"
import Slider from "@react-native-community/slider"
import { useTranslation } from "react-i18next"
import AppBottomSheet from "../../shared/AppBottomSheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { BottomSheetFooter, BottomSheetFooterProps, BottomSheetScrollView } from "@gorhom/bottom-sheet"

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
    const { tags, minPrice, maxPrice, startDate, radius } = useAppSelector(state => state.filtersSlice.filters)
    const { t } = useTranslation()
    const [choosedFilters, setChoosedFilters] = useState<IFilters>({
        tags: [...tags],
        minPrice,
        maxPrice,
        startDate,
        radius,
        endDate: null
    })
    const navigation = useNavigation<NavigationProps>()
    const dispatch = useAppDispatch()
    const submitFilters = async () => {
        dispatch(setFiltersState(choosedFilters))
        navigation.goBack()
    }
    const setFiltersStringValues = (key: keyof IFilters, value: string) => {
        setChoosedFilters((state) => ({ ...state, [key]: value.replace(/[^0-9]/g, '') }))
    }
    const setFiltersNumberValues = (name: string, value: number, infinityValue: number) => {
        setChoosedFilters({ ...choosedFilters, [name]: value === infinityValue ? null : value })
    }
    const setFiltersDateValues = (name: string, value: number | undefined) => {
        if (value)
            setChoosedFilters({ ...choosedFilters, [name]: new Date(value) })
    }
    const clearFilters = () => {
        setChoosedFilters({
            tags: [],
            minPrice: null,
            maxPrice: null,
            startDate: null,
            endDate: null,
            radius: null
        })
        dispatch(setFiltersState({
            tags: [],
            minPrice: null,
            maxPrice: null,
            startDate: null,
            endDate: null,
            radius: null
        }))
    }
    const { top, bottom } = useSafeAreaInsets()
    const renderFooter = useCallback(
        (props: BottomSheetFooterProps) => (
            <StyledFilterModalFooter style={{paddingBottom: bottom}} {...props}>
                <TouchableOpacity onPress={clearFilters}>
                    <H6 textcolor="Grey">{t("clear")}</H6>
                </TouchableOpacity>
                <PrimaryMediumButton onPress={submitFilters} title={t("submit")}></PrimaryMediumButton>
            </StyledFilterModalFooter>
        ),
        []
    );
    return (
        <AppBottomSheet snapPoints={[ "90%"]} footerComponent={renderFooter}>
            <StyledSearchModal>
                <StyledFilterModalHeader>
                    <H1>{t("filters")}</H1>
                </StyledFilterModalHeader>
                <BottomSheetScrollView>
                    <StyledFiltersContent style={{marginBottom: bottom + 80}}>
                        <StyledFiltersSection>
                            <H3>{t("price")}</H3>
                            <StyledInputsRangeContainer>
                                <View style={{ flex: 0.5 }}>
                                    <PrimaryFormInput keyboardType='numeric' inputStyle="Primary" value={choosedFilters.minPrice?.toString()} onChangeText={(value) => setFiltersStringValues("minPrice", value)} placeholder={t("min")} />
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <PrimaryFormInput keyboardType='numeric' inputStyle="Primary" value={choosedFilters.maxPrice?.toString()} onChangeText={(value) => setFiltersStringValues("maxPrice", value)} placeholder={t("max")} />
                                </View>
                            </StyledInputsRangeContainer>
                        </StyledFiltersSection>
                        <Line />
                        <StyledFiltersSection>
                            <H3>{t("date")}</H3>
                            <StyledInputsRangeContainer>
                                <View style={{ flex: 0.5 }}>
                                    <PrimaryDatePicker display="spinner" onChange={(value) => setFiltersDateValues("startDate", value.nativeEvent.timestamp)} placeholder={t("minDate")} minimumDate={new Date} maximumDate={choosedFilters.endDate || undefined} value={choosedFilters.startDate} />
                                </View>
                                <View style={{ flex: 0.5 }}>
                                    <PrimaryDatePicker display="spinner" onChange={(value) => setFiltersDateValues("endDate", value.nativeEvent.timestamp)} placeholder={t("maxDate")} minimumDate={choosedFilters.startDate || new Date} value={choosedFilters.endDate} />
                                </View>
                            </StyledInputsRangeContainer>
                        </StyledFiltersSection>
                        <Line />
                        <StyledFiltersSection>
                            <H3>{t("distance")}</H3>
                            <StyledInputsRangeContainer>
                                <Slider
                                    style={{ flex: 1 }}
                                    step={1}
                                    value={choosedFilters.radius ? choosedFilters.radius : 51}
                                    minimumValue={1}
                                    maximumValue={51}
                                    tapToSeek
                                    onValueChange={(value) => setFiltersNumberValues("radius", value, 51)}
                                    minimumTrackTintColor="#2671FF"
                                    maximumTrackTintColor="#F2F5FA"
                                />
                                <View style={{ width: 120, alignItems: "center", justifyContent: "center" }}>
                                    {choosedFilters.radius ?
                                        <H6>{t("kilometersAway", { count: choosedFilters.radius })}</H6>
                                        :
                                        <H6>{t("any")}</H6>
                                    }
                                </View>
                            </StyledInputsRangeContainer>
                        </StyledFiltersSection>
                        <Line />
                        <TagsContent choosedFilters={choosedFilters} setChoosedFilters={setChoosedFilters} />
                    </StyledFiltersContent>
                </BottomSheetScrollView>
            </StyledSearchModal>
        </AppBottomSheet>
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
    padding-top: 28px;
`
const StyledFilterModalFooter = styled(BottomSheetFooter)`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    /* padding-top: 16px; */
    height: 90px;
    background-color: white;
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

