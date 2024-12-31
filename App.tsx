import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import StackNavigation from './src/navigation/StackNavigation';

import TrackPlayer from 'react-native-track-player';
// import {useSetupTrackPlayer} from './src/hooks/useSetupTrackPlayer.';
import useLikedSongs from './src/store/LikeStore';
import {darkTheme} from './src/theme/DarkTheme';
import {LightTheme} from './src/theme/LightTheme';
import {useThemeStore} from './src/store/ThemeStore';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { useSetupTrackPlayer } from './src/hooks/useSetupTrackPlayer';

const App = () => {
  const scheme = useColorScheme()
  const {isDarkMode, toggleTheme} = useThemeStore();
  console.log('isDarkMode', isDarkMode);
  const {loadLikedSongs} = useLikedSongs();
  useEffect(() => {
    loadLikedSongs();
    scheme === "light" ? toggleTheme(false) : toggleTheme(true)
  }, [scheme]);
  const onLoad = () => {
    console.log('track player setup success...');
  };
  useSetupTrackPlayer({onLoad});
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={isDarkMode ? darkTheme : LightTheme}>
        {/* <StackNavigation /> */}
        <DrawerNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
