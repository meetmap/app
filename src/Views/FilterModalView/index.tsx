import styled from "styled-components/native"
import { ScrollView, View } from "react-native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../types/NavigationProps"
import useAxios from "../../hooks/useAxios"
import { getTags } from "../../api/events"
import { useState } from "react"
import FilterTag from "../../shared/Tags/FilterTag"
import { ITag } from "../../types/event"
import { H1, H3, H4 } from "../../shared/Text"
import PrimaryMediumButton from "../../shared/Buttons/PrimaryMediumButton"
import PrimarySmallButton from "../../shared/Buttons/PrimarySmallButton"
import TagsContent from "./TagsContent"
import PrimaryFormInput from "../../shared/Input/PrimaryFormInput"
import { Line } from "../../shared/Line"

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'FilterModalView'>;
}

const FilterModalView = ({ }: IMainViewProps) => {
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
                                <PrimaryFormInput inputStyle="Primary" placeholder="$0" label="Min" />
                            </View>
                            <View style={{ flex: 0.5 }}>
                                <PrimaryFormInput inputStyle="Primary" placeholder="Infinite" label="Max" />
                            </View>
                        </StyledInputsRangeContainer>
                    </StyledFiltersSection>
                    <Line/>
                    <TagsContent />
                </StyledFiltersContent>
            </ScrollView>
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
    padding: 16px;
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

