import React from 'react'
import { Linking, View } from 'react-native'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from '@src/types/NavigationProps'
import { useTranslation } from 'react-i18next'
import TicketIcon from '@src/shared/Icons/TicketIcon'
import { PrimaryButton } from '@src/shared/Buttons'

interface IEventFooterActions {
    link: string
    eventCid: string
}
const EventFooterActions = ({ link, eventCid }: IEventFooterActions) => {
    const navigation = useNavigation<NavigationProps>()
    const { t } = useTranslation()

    const handleBuyTicketOpenLink = () => {
        if (link) {
            Linking.canOpenURL(link).then(supported => {
                if (supported) {
                    Linking.openURL(link);
                } else {
                    console.log("Don't know how to open URI: " + link);
                }
            });
        }
    };
    return (
        <StyledEventFooter>
            <PrimaryButton btnSize="md" onPress={handleBuyTicketOpenLink} btnType='Primary' title={t("buyTickets")}><TicketIcon /></PrimaryButton>
            <StyledEventFooterActions>
                <PrimaryButton btnSize="md" onPress={() => navigation.navigate("InviteFriendsModalView", { eventCid })} style={{ flex: 1 }} btnType='Secondary' title={t("inviteFriend")} />
                <PrimaryButton btnSize="md" style={{ flex: 1 }} btnType='Secondary' title={t("seeWhoGoes")} />
                <PrimaryButton btnSize="md" style={{ flex: 1 }} btnType='Secondary' title={t("iWillGo")} />
            </StyledEventFooterActions>
        </StyledEventFooter>
    )
}

export default EventFooterActions

const StyledEventFooter = styled(View)`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0 16px;
`
const StyledEventFooterActions = styled(View)`
    flex-direction: row;
    gap: 12px;
`