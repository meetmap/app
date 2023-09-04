import React from 'react'
import { styled } from 'styled-components/native'
import Setting from './Setting'
import { useTranslation } from 'react-i18next'
import ChooseLanguage from '@src/shared/Actions/ChooseLanguage'

const Settings = () => {
    const { i18n, t } = useTranslation()
    return (
        <StyledSettings>
            <Setting title={t("confidentiality")} onPress={ChooseLanguage} />
            <StyledLine />
            <Setting title={t("changePassword")} onPress={ChooseLanguage} />
            <StyledLine />
            <Setting title={t("language")} value={i18n.language} onPress={ChooseLanguage} />
        </StyledSettings>
    )
}

export default Settings

const StyledSettings = styled.View`
`
const StyledLine = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${props => props.theme.colors.BUTTON.Secondary.BorderDefault};
`