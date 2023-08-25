import { Image, ImageBackground, SafeAreaView, StatusBar, View } from 'react-native'
import styled from 'styled-components/native'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationProps';
import { H1, Title } from '../../shared/Text';
import HorizontalLogoIcon from '../../shared/Icons/Logos/HorizontalLogoIcon';
import { useTranslation } from 'react-i18next';

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeView'>;
}

const WelcomeView = ({ navigation }: IMainViewProps) => {
    const { t } = useTranslation()
    return (
        <StyledWelcomeView>
            <StyledImageBackground
                source={require('../../assets/globe.png')}
                imageStyle={{
                    // resizeMode: "cover",
                    height: 500, // the image height
                    top: undefined
                }}
            >
                <StyledWelcomeViewContent>
                    <StyledHeadContent>
                        <HorizontalLogoIcon />
                        <StyledHeadText>
                            <Title textcolor='Grey'>
                                {t("welcomeTitle1")}
                            </Title>
                            <Title textcolor='White'>
                                {t("welcomeTitle2")}
                            </Title>
                        </StyledHeadText>
                    </StyledHeadContent>
                    <StyledBottomContent>
                        <PrimaryButton onPress={() => navigation.navigate("RegisterView")} btnType='White' title={t("signUp")} />
                        <PrimaryButton onPress={() => navigation.navigate("LoginView")} btnType='Black' title={t("signIn")} />
                    </StyledBottomContent>
                </StyledWelcomeViewContent>
            </StyledImageBackground>
        </StyledWelcomeView>
    )
}

export default WelcomeView


const StyledWelcomeView = styled(View)`
    justify-content: space-between;
    flex: 1;
`
const StyledWelcomeViewContent = styled(SafeAreaView)`
    justify-content: space-between;
    flex: 1;
    `
const StyledImageBackground = styled(ImageBackground)`
    justify-content: space-between;
    flex: 1;
`
const StyledHeadContent = styled(View)`
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    gap: 32px;
    margin-top: 40px;
`
const StyledHeadText = styled(View)`
    flex-direction: column;
`
const StyledBottomContent = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    padding: 0 16px;
    gap: 12px;
`