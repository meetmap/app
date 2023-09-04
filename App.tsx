// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './src/shared/Theme';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Navigator from './src/Navigator';
import codePush from 'react-native-code-push';
import { MapProvider } from './src/hooks/MapProvider';
import './i18n.config'
import { getFromSecureStore, setToSecureStore } from './src/api/secure-store';
import { SecureStoreKeys } from './src/constants';
import { getLocales } from 'react-native-localize';
import { useTranslation } from 'react-i18next';
import ErrorPopup from './src/shared/ErrorPopup';
import RNBootSplash from "react-native-bootsplash";
import { InitializeUserThunk } from './src/store/slices/userSlice';
import { NavigationProps } from './src/types/NavigationProps';

const App: () => JSX.Element = () => {
  const { i18n } = useTranslation()
  const detectLocale = async () => {
    const storeLocale = await getFromSecureStore(SecureStoreKeys.LANGUAGE);
    if (storeLocale) {
      i18n.changeLanguage(storeLocale)
      return
    }
    const systemLang = getLocales()[0].languageCode
    i18n.changeLanguage(systemLang)
    await setToSecureStore(SecureStoreKeys.LANGUAGE, systemLang);
  }
  useEffect(() => {
    const init = async () => {
      await detectLocale()
      await store.dispatch(InitializeUserThunk());
    };
    init().finally(async () => {
      await RNBootSplash.hide({ fade: true, duration: 500 });
      console.log("BootSplash has been hidden successfully");
    });
  }, []);

  const navigationRef = useRef<NavigationContainerRef<NavigationProps>>(null)
  return (
    <Provider store={store}>
      <MapProvider>
        <ThemeProvider theme={mainTheme}>
          <NavigationContainer ref={navigationRef}>
            <Navigator />
            <ErrorPopup navigationRef={navigationRef}/>
          </NavigationContainer>
        </ThemeProvider>
      </MapProvider>
    </Provider>
  );
};
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
const CodePushApp = codePush(codePushOptions)(App);
export default CodePushApp;
