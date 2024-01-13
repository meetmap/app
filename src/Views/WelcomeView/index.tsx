import {ImageBackground, Platform, SafeAreaView, View} from 'react-native';
import styled from 'styled-components/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types/NavigationProps';
import {Title} from '@src/shared/Text';
import HorizontalLogoIcon from '@src/shared/Icons/Logos/HorizontalLogoIcon';
import {useTranslation} from 'react-i18next';
import {PrimaryButton} from '@src/shared/Buttons';
import {
  appleAuth,
} from '@invertase/react-native-apple-authentication';
interface IMainViewProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WelcomeView'>;
}

export const WelcomeView = ({navigation}: IMainViewProps) => {
  const {t} = useTranslation();
  async function onAppleButtonPress() {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
    }
  }
  return (
    <StyledWelcomeView>
      <StyledImageBackground
        source={require('../../assets/globe.png')}
        imageStyle={{
          // resizeMode: "cover",
          height: 500, // the image height
          top: undefined,
        }}>
        <StyledWelcomeViewContent>
          <StyledHeadContent>
            <HorizontalLogoIcon />
            <StyledHeadText>
              <Title textcolor="Grey">{t('welcomeTitle1')}</Title>
              <Title textcolor="White">{t('welcomeTitle2')}</Title>
            </StyledHeadText>
          </StyledHeadContent>
          <StyledBottomContent>
            <PrimaryButton
              btnSize="lg"
              onPress={() => navigation.navigate('RegisterView')}
              btnType="White"
              title={t('signUp')}
            />
            <PrimaryButton
              onPress={() => navigation.navigate('LoginView')}
              btnType="Black"
              title={t('signIn')}
            />
            <StyledOtherAuthMethods>
              <PrimaryButton
                onPress={onAppleButtonPress}
                btnType="Black"
                title={t('signIn')}
              />
            </StyledOtherAuthMethods>
          </StyledBottomContent>
        </StyledWelcomeViewContent>
      </StyledImageBackground>
    </StyledWelcomeView>
  );
};

const StyledWelcomeView = styled(View)`
  justify-content: space-between;
  flex: 1;
`;
const StyledWelcomeViewContent = styled(SafeAreaView)`
  justify-content: space-between;
  flex: 1;
`;
const StyledImageBackground = styled(ImageBackground)`
  justify-content: space-between;
  flex: 1;
`;
const StyledHeadContent = styled(View)`
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  gap: 32px;
  margin-top: 40px;
`;
const StyledHeadText = styled(View)`
  flex-direction: column;
`;
const StyledBottomContent = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 16px;
  gap: 12px;
`;
const StyledOtherAuthMethods = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
