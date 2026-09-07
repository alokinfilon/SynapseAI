import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { useTheme } from '../../../../hooks';
import { FADE_DURATION, LOADING_TIMEOUT } from './constants';

export interface Splash1ScreenProps {
  onFinish?: () => void;
  onFinishLoading?: () => void;
  style?: any;
}

export const useSplash1 = ({ onFinishLoading }: Splash1ScreenProps) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();

    if (onFinishLoading) {
      const timer = setTimeout(() => {
        onFinishLoading();
      }, LOADING_TIMEOUT);
      return () => clearTimeout(timer);
    }
  }, [fadeAnim, onFinishLoading]);

  return {
    theme,
    fadeAnim,
  };
};
