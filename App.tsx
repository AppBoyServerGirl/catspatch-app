import {StatusBar} from 'expo-status-bar';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import 'moment/locale/ko';
import {theme} from "./theme";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <NativeBaseProvider theme={theme}>
          <Navigation colorScheme={colorScheme}/>
          <StatusBar/>
        </NativeBaseProvider>
      </SafeAreaProvider>
    );
  }
}
