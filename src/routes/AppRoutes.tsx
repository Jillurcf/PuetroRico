import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer'; // Drawer Navigator
import {NavigationContainer} from '@react-navigation/native';
import {useDeviceContext} from 'twrnc'; // Ensures compatibility with Tailwind in React Native
import tw from '../lib/tailwind'; // Tailwind setup for styling

import BottomRoutes from './BottomRoutes'; // Bottom tab routes
import Login from '../screen/auth/Login';
import ForgetPassword from '../screen/auth/ForgetPassword';
import OtpVerification from '../screen/auth/OtpVerification';
import NewPassword from '../screen/auth/NewPassword';
import SignUp from '../screen/auth/Signup';
import TermsAndConditions from '../screen/TermsAndConditions';
import Faq from '../screen/Faq';
import TrackPlayer from 'react-native-track-player';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
// import PlayerScreen from '../screen/PlayerScreen';
import LikeScreen from '../screens/LikeScreent';

import SplashScreen from '../screen/SplashScreen';
import OnboardingScreen1 from '../screen/OnboardingScreen1';
import OnboardingScreen2 from '../screen/OnboardingScreen2';
import AllowNotification from '../screen/AllowNotification';
import BackgroundPermission from '../screen/BackgroundPermission';
import BackgroundLocation from '../screen/BackgroundLocation';
import EnjoyThreeAudiosFree from '../screen/EnjoyThreeAudiosFree';
import StoryPreview from '../screen/StoryPreview';
import MyStories from '../screen/MyStories';
import FavoriteScreen from '../screen/FavoriteScreen';
import BookMarkScreen from '../screen/BookMarkScreen';
import ChangePassword from '../screen/ChangePassword';
import SuccessScreen from '../screen/SuccessScreen';
import FaqScreen from '../screen/FaqScreen';

import PrivacyPolicy from '../screen/PrivacyPolicy';
import { useSetupTrackPlayer } from '../hooks/useSetupTrackPlayer';
import { AppState, useColorScheme } from 'react-native';
import CustomDrawerContent from '../navigation/CustomDrawerContent';
import { useThemeStore } from '../store/ThemeStore';
import useLikedSongs from '../store/LikeStore';
import Aboutus from '../screen/Aboutus';

// Create the stack and drawer navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const StackNavigator: React.FC = () => (
  <Stack.Navigator
  
    initialRouteName="BottomHome"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="splash" component={SplashScreen} />
    <Stack.Screen name="OnboardingScreen1" component={OnboardingScreen1} />
    <Stack.Screen name="OnboardingScreen2" component={OnboardingScreen2} />
    <Stack.Screen name="AllowNotification" component={AllowNotification} />
    <Stack.Screen name="BackgroundPermission" component={BackgroundPermission} />
    <Stack.Screen name="BackgroundLocation" component={BackgroundLocation} />
    <Stack.Screen name="login" component={Login} />
    <Stack.Screen name="signUp" component={SignUp} />
    <Stack.Screen name="forgetPassword" component={ForgetPassword} />
    <Stack.Screen name="otpVerification" component={OtpVerification} />
    <Stack.Screen name="newPassword" component={NewPassword} />
    <Stack.Screen name="termsCondition" component={TermsAndConditions} />
    <Stack.Screen name="faq" component={Faq} />
    {/* <Stack.Screen name="Player" component={PlayerScreen} /> */}
    <Stack.Screen name="EnjoyThreeFreeAudio" component={EnjoyThreeAudiosFree} />
    <Stack.Screen name="SrotyPreview" component={StoryPreview} />
    <Stack.Screen name="MyStories" component={MyStories} />
    <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
    <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
    <Stack.Screen name="Aboutus" component={Aboutus} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsAndCondition" component={TermsAndConditions} />

    
    <Stack.Screen name="BottomHome" component={BottomRoutes} />
  </Stack.Navigator>
);

const AppRoutes: React.FC = () => {
  
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

  useDeviceContext(tw);
  // useSetupTrackPlayer({onLoad});
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <SafeAreaView style={tw`flex-1`}>
          <NavigationContainer>
            <Drawer.Navigator
              screenOptions={{
                headerShown: false,
                drawerType: 'slide',
                // swipeEdgeWidth: 0,
              }}
              drawerContent={props => <CustomDrawerContent {...props} />}>
              <Drawer.Screen name="DRAWER_HOME" component={StackNavigator} />
            </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default AppRoutes;
