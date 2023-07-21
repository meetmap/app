/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { mainTheme } from './src/shared/Theme';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Navigator from './src/Navigator';
import { View } from 'react-native';
import codePush from 'react-native-code-push';
import { MapProvider } from './src/hooks/MapProvider';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MapProvider>
        <ThemeProvider theme={mainTheme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </ThemeProvider>
      </MapProvider>
    </Provider>
  );
}
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };
const CodePushApp = codePush(codePushOptions)(App);
export default CodePushApp;
