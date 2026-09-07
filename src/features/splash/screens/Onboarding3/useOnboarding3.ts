import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../../../hooks';

export interface Onboarding3ScreenProps {
  onNext?: () => void;
  onGetStarted?: () => void;
}

export const useOnboarding3 = ({ onNext, onGetStarted }: Onboarding3ScreenProps) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePress = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (onNext) {
      onNext();
    }
  };

  return {
    theme,
    fadeAnim,
    handlePress,
  };
};
