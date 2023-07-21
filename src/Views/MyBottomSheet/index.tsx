import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../types/NavigationProps';
import styled from 'styled-components/native';
import { Title } from '../../shared/Text';

export interface IMyBottomSheet {
    navigation: NativeStackNavigationProp<RootStackParamList, 'MyBottomSheet'>;
}

const MyBottomSheet = ({navigation}: IMyBottomSheet) => {
    return (
        <StyledMyBottomSheet>
            <Title>Hello</Title>
        </StyledMyBottomSheet>
    );
};

export default MyBottomSheet;


const StyledMyBottomSheet = styled(View)`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 22px 22px 0 0;
    padding: 16px;
    background-color: white;
    height: 300px;
`