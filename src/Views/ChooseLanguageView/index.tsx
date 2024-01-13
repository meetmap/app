import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList} from 'react-native';
import {styled} from 'styled-components/native';
import {H3} from '@src/shared/Text';
import {setToSecureStore} from '@src/api/secure-store';
import {SecureStoreKeys} from '@src/constants';
import CheckSmIcon from '@src/shared/Icons/CheckSmIcon';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export const ChooseLanguageView = () => {
  const {i18n} = useTranslation();
  const languages = [
    {name: 'en', label: 'English'},
    {name: 'ru', label: 'Русский'},
  ];

  const changeLanguage = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
    await setToSecureStore(SecureStoreKeys.LANGUAGE, languageCode);
  };
  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 25, paddingHorizontal: 16, gap: 8}}
      data={languages}
      renderItem={({item}) => (
        <StyledLanguageButton onPress={() => changeLanguage(item.name)}>
          <H3>{item.label}</H3>
          {item.name === i18n.language && (
            <Animated.View entering={FadeIn} exiting={FadeOut}>
              <CheckSmIcon />
            </Animated.View>
          )}
        </StyledLanguageButton>
      )}
      keyExtractor={item => item.name}
    />
  );
};

const StyledLanguageButton = styled.TouchableOpacity`
  padding: 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-color: ${props =>
    props.theme.colors.BUTTON.Secondary.BorderDefault};
  border-bottom-width: 1px;
`;
