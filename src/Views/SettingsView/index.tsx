import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { SafeAreaView } from 'react-native'
import { styled } from 'styled-components/native'
import { RootStackParamList } from '../../types/NavigationProps';
import MountingUnmounting from './MU';

export interface ISettingsViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'SettingsView'>;
  }
  
const SettingsView = ({}: ISettingsViewProps) => {
  return (
    <SafeAreaView>
        <StyledSettingsView>
          <MountingUnmounting/>
        </StyledSettingsView>
    </SafeAreaView>
  )
}

export default SettingsView

const StyledSettingsView = styled.View`
`