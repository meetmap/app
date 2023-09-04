import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../Icons/SearchIcon'
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'
import Filters2Icon from '../Icons/Filters2Icon'


type ISearchEventsInput = TextInputProps

const SearchEventsInput = ({ ...rest }: ISearchEventsInput) => {
    const navigation = useNavigation<NavigationProps>()
    return (
        <StyledInputContent>
            <StyledInputWrapper>
                <StyledInputIcon>
                    <SearchIcon strokeColor='Grey'/>
                </StyledInputIcon>
                <StyledPrimaryInput {...rest} autoCapitalize="none" />
                <StyledOpenFiltersButton onPress={() => navigation.navigate("FilterModalView")}>
                    <Filters2Icon strokeColor='Grey'/>
                </StyledOpenFiltersButton>
            </StyledInputWrapper>
        </StyledInputContent>
    )
}

export default SearchEventsInput



const StyledInputContent = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`

const StyledInputWrapper = styled(View)`
    position: relative;
`
const StyledInputStatus = styled(View)`
    position: absolute;
    left: 16px;
    display: flex;
`
const StyledInputIcon = styled(StyledInputStatus)`
    position: absolute;
    top: 0;
    left: 16px;
    bottom: 0;
    z-index: 1;
    margin-top: auto;
    margin-bottom: auto;
    justify-content: center;
`

const StyledPrimaryInput = styled(TextInput)`
    width: 100%;
    background: #F2F5FA;
    padding: 18px 18px 18px 52px;
    border: none;
    border-radius: 20px;

    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: black;
`
const StyledOpenFiltersButton = styled(TouchableOpacity)`
    background: #ffffff;
    padding: 8px;
    border-radius: 6px;
    position: absolute;
    right: 16px;
    top: 12px;
`