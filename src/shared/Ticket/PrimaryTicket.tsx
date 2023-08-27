import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import styled from 'styled-components'
import { H5, P } from '../Text'
import { ITicket } from '../../types/event'
import { useTranslation } from 'react-i18next'


interface IPrimaryTicket extends TouchableOpacityProps {
    ticket: ITicket
    oos?: boolean,
}

const PrimaryTicket = ({
    ticket,
    oos = false,
    ...props
}: IPrimaryTicket) => {
    const { t } = useTranslation()
    return (
        <StyledTicket activeOpacity={props.onPress ? undefined : 1} {...props} oos={oos}>
            <View>
                <H5 >{ticket.name}</H5>
                <P numberOfLines={3} style={{flexWrap: "wrap"}} textcolor='Grey'>{ticket.description}</P>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 20 }}>
                <P>{ticket.amount === -1 ? "" : `${t("amount")}: ${ticket.amount}`}</P>
                <P>{ticket.price === 0 ? t("freeTicket") : `${t("price")}: ${ticket.price}`}</P>
            </View>
        </StyledTicket>
    )
}

export default PrimaryTicket


const StyledTicket = styled(TouchableOpacity) <{ oos: boolean }>`
  border: solid 1px ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
  min-width: 200px;
  max-width: 300px;
  height: 150px;
  gap: 6px;
  padding: 16px;
  justify-content: space-between;
  border-radius: 16px;
`