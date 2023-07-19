import React, { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'
import SearchIcon from '../Icons/SearchIcon'
import { TextInput, TextInputProps, View } from 'react-native'


interface ISearchInput extends TextInputProps {
}
const SearchInput = ({ ...rest }: ISearchInput) => {
    return (
        <StyledInputContent>
            <StyledInputWrapper>
                <StyledInputIcon>
                    <SearchIcon/>
                </StyledInputIcon>
                <StyledPrimaryInput {...rest} autoCapitalize="none" />
            </StyledInputWrapper>
        </StyledInputContent>
    )
}

export default SearchInput



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
const StyledInputIcon = styled(StyledInputStatus)``

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
    ::placeholder{
        color: #898F99;
    }
`