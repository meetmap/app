import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'
import { NavigationProps } from '../../types/NavigationProps'
import { P } from '../Text'
import { ITag } from '../../types/event'
import { TouchableOpacity } from 'react-native'

const EventTag = ({tag}: {tag: ITag}) => {
    const navigation = useNavigation<NavigationProps>()
    return (
        <StyledEventTag onPress={() => navigation.navigate("FilterModalView")}>
            <P>{tag.label}</P>
        </StyledEventTag>
    )
}

export default EventTag

const StyledEventTag = styled(TouchableOpacity)`
    padding: 6px 8px;
    border-radius: 12px;
    border: 1px solid #E6EAF2;
`