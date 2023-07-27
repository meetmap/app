import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components/native'
import GoBackArrowIcon from '../Icons/GoBackArrowIcon'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '../../types/NavigationProps'
import SettingsIcon from '../Icons/SettingsIcon'

const CustomHeader = () => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <StyledCustomHeader>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <GoBackArrowIcon />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SettingsView")}>
        <SettingsIcon />
      </TouchableOpacity>
    </StyledCustomHeader>
  )
}

export default CustomHeader

const StyledCustomHeader = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  left: 16px;
  right: 16px;
`