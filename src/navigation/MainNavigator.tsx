import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStackParamList } from './types';
import {
  ActiveChatScreen,
  ChatListHomeScreen,
  EndedChatsScreen,
  WelcomeHomeScreen,
} from '../features/chat/screens';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelcomeHome"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen name="WelcomeHome" component={WelcomeHomeScreen} />
      <Stack.Screen name="ChatListHome" component={ChatListHomeScreen} />
      <Stack.Screen name="ActiveChat" component={ActiveChatScreen} />
      <Stack.Screen name="EndedChats" component={EndedChatsScreen} />
    </Stack.Navigator>
  );
};
