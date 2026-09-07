import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../../../hooks';

export interface Onboarding1ScreenProps {
  onNext?: () => void;
  onGetStarted?: () => void;
}

export const useOnboarding1 = ({ onNext }: Onboarding1ScreenProps) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return {
    theme,
    fadeAnim,
    onNext,
  };
};
