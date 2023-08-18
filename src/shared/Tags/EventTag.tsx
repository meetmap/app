import { useNavigation } from '@react-navigation/native'
import React from 'react'
import styled from 'styled-components/native'
import { NavigationProps } from '../../types/NavigationProps'
import { P } from '../Text'
import { ITag } from '../../types/event'
import { TouchableOpacity, View } from 'react-native'

const EventTag = ({tag}: {tag: ITag}) => {
    // const navigation = useNavigation<NavigationProps>()
    return (
        <StyledEventTag>
            <P>{tag.label}</P>
        </StyledEventTag>
    )
}

export default EventTag

const StyledEventTag = styled(View)`
    padding: 6px 8px;
    border-radius: 12px;
    border: 1px solid #E6EAF2;
`