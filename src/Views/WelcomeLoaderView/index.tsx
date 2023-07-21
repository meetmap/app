import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styled from 'styled-components/native'
import { H2, Title } from '../../shared/Text'
import LoaderContainer from '../../shared/LoaderContainer'

const WelcomeLoaderView = () => {
    return (
        <SafeAreaView>
            <StyledLoaderPageContent>
                <StyledAuthHeadContent>
                    <Title textcolor='Black' style={{textAlign: "center"}}>Hey!</Title>
                    <Title textcolor='Black' style={{textAlign: "center"}}>Glad you're back</Title>
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

const StyledLoaderContent = styled(View)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const StyledAuthHeadContent = styled(View)`
  text-align: center;
`