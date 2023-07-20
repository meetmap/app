/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ThemeProvider} from 'styled-components';
import {mainTheme} from './src/shared/Theme';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import Navigator from './src/Navigator';
import {View} from 'react-native';
import codePush from 'react-native-code-push';

const App: () => JSX.Element = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};
let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.ON_NEXT_RESUME,
};
const CodePushApp = codePush(codePushOptions)(App);
export default CodePushApp;
