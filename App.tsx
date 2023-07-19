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


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <NavigationContainer>
          <Navigator/>
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
