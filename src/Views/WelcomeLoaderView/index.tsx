import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { Title } from '@src/shared/Text'
import LoaderContainer from '@src/shared/LoaderContainer'
import { useTranslation } from 'react-i18next'

const WelcomeLoaderView = () => {
    const { i18n } = useTranslation()
    return (
        <SafeAreaView>
            <StyledLoaderPageContent>
                <StyledAuthHeadContent>
                    {i18n.language === "en" ?
                        <>
                            <Title textcolor='Black' style={{ textAlign: "center" }}>Hey!</Title>
                            <Title textcolor='Black' style={{ textAlign: "center" }}>Glad you're back</Title>
                        </>
                        :
                        <Title textcolor='Black' style={{ textAlign: "center" }}>Загрузка</Title>
                    }
                </StyledAuthHeadContent>
                <LoaderContainer />
            </StyledLoaderPageContent>
        </SafeAreaView>
    )
}

export default WelcomeLoaderView

const StyledLoaderPageContent = styled(View)`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: column;
    gap: 36px;
    padding: 0 16px;
    padding-top: 83px;
`

const StyledAuthHeadContent = styled(View)`
  text-align: center;
`