import { Image, ImageBackground, SafeAreaView, View } from 'react-native'
import styled from 'styled-components/native'
import PrimaryButton from '../../shared/Buttons/PrimaryButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationProps';
import { H1, Title } from '../../shared/Text';
import { CustomSafeAreaView } from '../../shared/CustomSafeAreaView';
import HorizontalLogoIcon from '../../shared/Icons/Logos/HorizontalLogoIcon';

export interface IMainViewProps {
    navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeView'>;
}

const WelcomeView = ({ navigation }: IMainViewProps) => {
    console.log("aa", require('../../assets/globe.png'))
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
                                Meetmap is...
                            </Title>
                            <Title textcolor='White'>
                                interactive map to find events... and friends
                            </Title>
                        </StyledHeadText>
                    </StyledHeadContent>
                    <StyledBottomContent>
                        <PrimaryButton onPress={() => navigation.navigate("RegisterView")} btnType='White'>Sign up</PrimaryButton>
                        <PrimaryButton onPress={() => navigation.navigate("LoginView")} btnType='Black'>Sign in</PrimaryButton>
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
    background-color: black;
`
const StyledWelcomeViewContent = styled(CustomSafeAreaView)`
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
    button{
        width: 100%;
    }
`