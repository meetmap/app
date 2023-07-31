import React from 'react'
import styled from 'styled-components/native'
import { P } from '../../shared/Text'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RightArrowIcon from '../../shared/Icons/RightArrowIcon'
import { NavigationProps } from '../../types/NavigationProps'

const Setting = ({ title, value, navigateTo }: { title: string, value: string, navigateTo: any }) => {
    const navigation = useNavigation<NavigationProps>()
    return (
        <StyledSetting onPress={() => navigation.navigate(navigateTo)}>
            <P>{title}</P>
            <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                <P textcolor='Primary'>{value}</P>
                <RightArrowIcon />
            </View>
        </StyledSetting>
    )
}

export default Setting

const StyledSetting = styled.TouchableOpacity`
    padding: 16px 0;
    flex-direction: row;
    justify-content: space-between;
`