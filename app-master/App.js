/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import './src/lib/i18n'
import Routes from './src/routes'
import { AppearanceProvider } from 'react-native-appearance'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  return (
    <AppearanceProvider>
      <MenuProvider>
        <KeyboardAvoidingView
          behavior={(Platform.OS === 'ios') ? 'padding' : null}
          style={{ flex: 1 }}
        >
          <Routes />
        </KeyboardAvoidingView>
      </MenuProvider>
    </AppearanceProvider>
  )
}

export default App
