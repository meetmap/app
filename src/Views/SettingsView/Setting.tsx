import React from 'react'
import styled from 'styled-components/native'
import { H5, H6, P } from '../../shared/Text'
import { View } from 'react-native'
import RightArrowIcon from '../../shared/Icons/RightArrowIcon'

const Setting = ({ title, value, onPress }: { title: string, value?: string, onPress: any }) => {
    return (
        <StyledSetting onPress={onPress}>
            <H6>{title}</H6>
            <View style={{ flexDirection: "row", gap: 6, alignItems: "center" }}>
                {value && <H6 textcolor='Primary'>{value}</H6>}
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