import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import {
  CreateNewPasswordScreen,
  FillProfileScreen,
  ForgotPasswordMethodsScreen,
  LetsInScreen,
  OTPVerificationScreen,
  SignInScreen,
  SignUpScreen,
} from '../features/authentication/screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="LetsIn"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="LetsIn" component={LetsInScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPasswordMethods" component={ForgotPasswordMethodsScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
      <Stack.Screen name="FillProfile" component={FillProfileScreen} />
    </Stack.Navigator>
  );
};
