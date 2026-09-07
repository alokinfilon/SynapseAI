import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../../../hooks';

export interface Onboarding2ScreenProps {
  onNext?: () => void;
}

export const useOnboarding2 = ({ onNext }: Onboarding2ScreenProps) => {
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
