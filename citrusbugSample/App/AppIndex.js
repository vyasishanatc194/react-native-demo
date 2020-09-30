import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginSelectScreen from '../App/Screens/AuthenticationScreens/LoginSelectScreen';
import Login from '../App/Screens/AuthenticationScreens/Login';
import ForgotPasswordscreen from '../App/Screens/AuthenticationScreens/ForgotPasswordscreen';
import ResetPassword from '../App/Screens/AuthenticationScreens/ResetPassword';
import SignUpNormal from '../App/Screens/AuthenticationScreens/SignUpNormal';
import SignUpBussiness from '../App/Screens/AuthenticationScreens/SignUpBussiness';
import StoreIndex from '../App/Screens/StoreDashBoardScreens/StoreIndex';
import HorizontalFlatListExample from '../App/Screens/StoreDashBoardScreens/HorizontalFlatListExample'
export default function AppIndex() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginSelect" component={LoginSelectScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordscreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpNormal" component={SignUpNormal} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpBussiness" component={SignUpBussiness} options={{ headerShown: false }} />
        <Stack.Screen name="StoreIndex" component={StoreIndex} options={{ headerShown: false }} />
        <Stack.Screen name="HorizontalFlatListExample" component={HorizontalFlatListExample} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}